"use strict";

var jwt = require('jsonwebtoken');

var bcrypt = require("bcrypt");

var _require = require("../database/db"),
    pool = _require.pool;

var _require2 = require('util'),
    promisify = _require2.promisify; //procedimiento para registrarnos


exports.register = function _callee(req, res) {
  var nombre, email, password, password2, rol, errors, hashendPassword;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          nombre = req.body.nombre;
          email = req.body.email;
          password = req.body.password;
          password2 = req.body.password2;
          rol = req.body.rol;
          errors = [];

          if (!nombre || !email || !password || !password2 || !rol) {
            errors.push({
              message: "ingrese formulario completro"
            });
          }

          if (password2.length < 6) {
            errors.push({
              message: "Contraseña mayor a 6 caracteres"
            });
          }

          if (password != password2) {
            errors.push({
              message: "Contraseña tiene que ser iguales"
            });
          }

          if (!(errors.length > 0)) {
            _context.next = 14;
            break;
          }

          res.render("register", {
            errors: errors
          });
          _context.next = 18;
          break;

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 16:
          hashendPassword = _context.sent;
          pool.query("SELECT * FROM usuarios\n                  WHERE email = $1", [email], function (err, results) {
            if (err) {
              throw err;
            }

            console.log(results.rows);

            if (results.rows.length > 0) {
              errors.push({
                message: "email ya ingresado"
              });
              res.render('register', {
                errors: errors
              });
            } else {
              pool.query("INSERT INTO usuarios (name, email, password,rol)\n                            VALUES ($1, $2, $3, $4)\n                            RETURNING id, password", [nombre, email, hashendPassword, rol], function (err, req) {
                if (err) {
                  throw err;
                }

                console.log(results.rows); //req.flash("success_msg", "You are now registered. Please log in");

                res.redirect("/login");
              });
            }
          });

        case 18:
          _context.next = 23;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

exports.login = function _callee2(req, res) {
  var email, password;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            email = req.body.email;
            password = req.body.password;

            if (!email || !password) {
              res.render('login', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un email y password validos",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
              });
            } else {
              pool.query("SELECT * FROM usuarios WHERE email = $1", [email], function (err, results) {
                if (err) {
                  throw err;
                }

                console.log(results.rows);

                if (results.rows.length > 0) {
                  var user = results.rows[0];
                  bcrypt.compare(password, user.password, function (err, isMatch) {
                    if (err) {
                      console.log(err);
                    }

                    if (isMatch) {
                      //contraseña iso mach
                      var id = user.id;
                      var token = jwt.sign({
                        id: id
                      }, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                      });
                      console.log("TOKEN:" + token + "para el usuario:" + user.name);
                      var cookiesOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                      };
                      res.cookie('jwt', token, cookiesOptions);
                      res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: ''
                      });
                    } else {
                      //password is incorrect
                      res.render('login', {
                        alert: true,
                        alertTitle: "Advertencia",
                        alertMessage: "Ingrese un email y password validos",
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                      });
                    }
                  });
                } else {
                  // No user
                  res.render('login', {
                    alert: true,
                    alertTitle: "Advertencia",
                    alertMessage: "Ingrese un email y password validos",
                    alertIcon: 'info',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                  });
                }
              });
            }
          } catch (error) {
            console.log(error);
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.isAuthenticated = function _callee3(req, res, next) {
  var decodificada;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!req.cookies.jwt) {
            _context3.next = 14;
            break;
          }

          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO));

        case 4:
          decodificada = _context3.sent;
          pool.query("SELECT * FROM usuarios WHERE id = $1", [decodificada.id], function (err, results) {
            if (err) {
              throw err;
            } else {
              if (results.rows.length == 0) {
                return next();
              }

              req.user = results.rows[0];
              return next();
            }
          });
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);
          return _context3.abrupt("return", next());

        case 12:
          _context3.next = 15;
          break;

        case 14:
          res.redirect('/login');

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.logout = function (req, res) {
  res.clearCookie('jwt');
  return res.redirect('/');
};