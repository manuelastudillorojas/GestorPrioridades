const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const { pool }= require("../database/db");
const {promisify} = require('util')

//procedimiento para registrarnos
exports.register = async (req, res)=>{    
    try {
        const nombre = req.body.nombre;
        const email = req.body.email;
        const password = req.body.password; 
        const password2 = req.body.password2; 
        const rol = req.body.rol; 
        
        let errors =[];
        if(!nombre || !email || !password || !password2 || !rol){
            errors.push({message:"ingrese formulario completro"});
        }
        if(password2.length <6){
            errors.push({message:"Contraseña mayor a 6 caracteres"});
        }
    
        if(password != password2){
            errors.push({message:"Contraseña tiene que ser iguales"});
        }
    
        if(errors.length> 0){
            res.render("register",{errors});
        }else{
            let hashendPassword = await bcrypt.hash(password, 10);
            pool.query(
                `SELECT * FROM usuarios
                  WHERE email = $1`,
                [email],
                (err, results) =>{
                    if(err){
                        throw err
                    }
                    console.log(results.rows)
                    if(results.rows.length>0){
                        errors.push({message:"email ya ingresado"});
                        res.render('register',{errors});
                    }else{
                        pool.query(
                        `INSERT INTO usuarios (name, email, password,rol)
                            VALUES ($1, $2, $3, $4)
                            RETURNING id, password`, [nombre,email,hashendPassword,rol],
                            (err,req) => {
                                if (err){
                                    throw err;
                                }
                                console.log(results.rows);
                                //req.flash("success_msg", "You are now registered. Please log in");
                                res.redirect("/login");
                            }
                        )
                    }
                }
            );
        }
    } catch (error) {
        console.log(error)
    } 
} 


exports.login = async(req,res)=>{
   try{
        const email = req.body.email;
        const password = req.body.password;
        if(!email || ! password){
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un email y password validos",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            });
        }else{
            pool.query(
                `SELECT * FROM usuarios WHERE email = $1`,
                [email],
                (err, results) => {
                  if (err) {
                    throw err;
                  }
                  console.log(results.rows);
          
                  if (results.rows.length > 0) {
                    const user = results.rows[0];
          
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                      if (err) {
                        console.log(err);
                      }
                      if (isMatch) {
                          //contraseña iso mach

                          const id = user.id;
                          const token = jwt.sign({id:id},process.env.JWT_SECRETO,{
                              expiresIn: process.env.JWT_TIEMPO_EXPIRA
                          });
                          console.log("TOKEN:"+token+"para el usuario:"+user.name)

                          const cookiesOptions = {
                            expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                            }
                            res.cookie('jwt', token, cookiesOptions)
                            res.render('login', {
                                alert: true,
                                alertTitle: "Conexión exitosa",
                                alertMessage: "¡LOGIN CORRECTO!",
                                alertIcon:'success',
                                showConfirmButton: false,
                                timer: 800,
                                ruta: ''
                           })
                      } else {
                        //password is incorrect
                        res.render('login',{
                            alert:true,
                            alertTitle: "Advertencia",
                            alertMessage: "Ingrese un email y password validos",
                            alertIcon:'info',
                            showConfirmButton: true,
                            timer: false,
                            ruta: 'login'
                        });
                      }
                    });
                  } else {
                    // No user
                    res.render('login',{
                        alert:true,
                        alertTitle: "Advertencia",
                        alertMessage: "Ingrese un email y password validos",
                        alertIcon:'info',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    });
                  }
                }
              );
        }
    }catch(error){
                console.log(error)
   }
}
exports.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
         
            pool.query(
                `SELECT * FROM usuarios WHERE id = $1`,
                [decodificada.id],
                (err, results) => {
                  if (err) {
                    throw err;
                  }else{
                  
                    if (results.rows.length == 0) {
                        return next()
                    }
                    req.user = results.rows[0];
                    return next();
                  }
            
                }
              );
            
           
        } catch (error) {
            console.log(error);
            return next();
        }
    }else{
        res.redirect('/login');   
       
    }
}
exports.logout = (req, res)=>{
    res.clearCookie('jwt')   
    return res.redirect('/')
}
