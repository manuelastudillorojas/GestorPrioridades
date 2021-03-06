const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const dbconn = require('../config/dbConn')


const { promisify } = require('util')


//procedimiento para registrarnos
exports.register = async (req, res) => {
    try {
        const nombre = req.body.nombre
        const email = req.body.correo
        const password = req.body.contrasena
        const passwordConfirm = req.body.contrasenaConfirm
        const rol = req.body.rol

        let errors = []
        if (!nombre || !email || !password || !passwordConfirm || !rol) {
            errors.push({ message: "ingrese formulario completo" })
        }
        if (passwordConfirm.length < 6) {
            errors.push({ message: "Password mayor a 6 caracteres" })
        }

        if (password != passwordConfirm) {
            errors.push({ message: "Passwords tiene que ser iguales" })
        }

        if (errors.length > 0) {
            res.send({ errors })
        } else {
            let hashendPassword = await bcrypt.hash(password, 10)
            dbconn.query(
                `SELECT * FROM usuarios
                  WHERE correo = $1`,
                [email],
                (err, results) => {
                    if (err) {
                        throw err
                    }

                    if (results.rows.length > 0) {
                        errors.push({ message: "Correo ya ingresado" })
                        res.send({ errors })
                    } else {
                        dbconn.query(
                            `INSERT INTO usuarios (nombre, correo, contrasena,rol)
                            VALUES ($1, $2, $3, $4)
                            RETURNING *`, [nombre, email, hashendPassword, rol],
                            (err, nuevoUsuario) => {
                                if (err) {
                                    throw err
                                }
                                //req.flash("success_msg", "You are now registered. Please log in")
                                //res.redirect("/login")
                                res.send({ msg: `usuario registrado`, datos: nuevoUsuario.rows})
                            }
                        )
                    }
                }
            )
        }
    } catch (error) {
        throw err
    }
}


exports.login = async (req, res) => {
    try {
        const email = req.body.correo
        const password = req.body.contrasena

        if (!email || !password) {
            res.send({
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un email y password validos",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        } else {

            dbconn.query(
                `SELECT * FROM usuarios WHERE correo = $1`,
                [email],
                (err, results) => {
                    if (err) {
                        throw err
                    }

                    if (results.rows.length > 0) {
                        const user = results.rows[0]


                        bcrypt.compare(password, user.contrasena, (err, isMatch) => {
                            if (err) {
                                throw err
                            }
                            //console.log(password, user.contrasena, isMatch)
                            if (isMatch) {

                                console.log(user.rol)
                                const id = user.id
                                const token = jwt.sign({ id: id, rol: user.rol}, process.env.JWT_SECRETO, {
                                    expiresIn: process.env.JWT_TIEMPO_EXPIRA
                                })
                                //console.log("TOKEN:" + token + "para el usuario:" + user.name)

                                const cookiesOptions = {
                                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                                    httpOnly: true
                                }
                                res.cookie('jwt', token, cookiesOptions)
                                res.send({
                                    alert: true,
                                    alertTitle: "Conexi??n exitosa",
                                    alertMessage: "??LOGIN CORRECTO!",
                                    alertIcon: 'success',
                                    showConfirmButton: false,
                                    timer: 800,
                                    ruta: '',
                                    token: token,
                                    correo: email
                                })
                            } else {
                                //password is incorrect
                                res.send({
                                    alert: true,
                                    alertTitle: "Advertencia",
                                    alertMessage: "Password inv??lido",
                                    alertIcon: 'info',
                                    showConfirmButton: true,
                                    timer: false,
                                    ruta: 'login'
                                })
                            }
                        })
                    } else {
                        // No user
                        res.send({
                            alert: true,
                            alertTitle: "Advertencia",
                            alertMessage: "Ingrese un email y password validos",
                            alertIcon: 'info',
                            showConfirmButton: true,
                            timer: false,
                            ruta: 'login'
                        })
                    }
                }
            )
        }
    } catch (error) {
        res.status(401).json({
            error:"Accion no permitida",
          });
    }
}


exports.isAuthenticated = (rol) => async (req, res, next) => {

    const authHeader = req.headers['authorization']

    //console.log(authHeader)

    if (authHeader) {
        try {
            const decodificada = await promisify(jwt.verify)(authHeader, process.env.JWT_SECRETO)

            console.log(decodificada)
            dbconn.query(
                `SELECT * FROM usuarios WHERE id = $1`,
                [decodificada.id],
                (err, results) => {
                    if (err) {
                        throw err
                    } else {

                        if (results.rows.length == 0) {
                            return next()
                        }
                        req.user = results.rows[0]

                        if(results.rows[0].rol == rol || results.rows[0].rol == 'admin') {
                            console.log(results.rows[0].rol)
                            return next()
                        }  else {
                            res.status(401).json({
                                error:"Accion no permitida: no tienes autorizacion",
                            });
                        }
                    }

                }
            )
        } catch (error) {
            console.log(error)
            return next()
        }
    } else {
        res.status(401).json({
            error:"Accion no permitida",
          });

    }
}

exports.verifyToken = async (req, res) => {
    if (req.query.token) {
        try {
            const decodificada = await promisify(jwt.verify)(req.query.token, process.env.JWT_SECRETO)

            dbconn.query(
                `SELECT * FROM usuarios WHERE id = $1`,
                [decodificada.id],
                (err, results) => {
                    if (err) {
                        res.send({
                            error: 'error'
                        })
                    } else {
                        res.status(200).json({
                            token: req.query.token,
                            correo: results.rows[0].correo
                        })
                        
                    }
                }
            )
        } catch (error) {
            res.send({
                error: 'token no autorizado'
            })
        }
    } else {
        res.status(401).json({
            error:"Accion no permitida",
          });

    }
}


exports.logout = (req, res) => {
    res.clearCookie('jwt')
    return res.send({ msg: `sesion eliminada`})
}
