const express=require("express");
const { pool }= require("./config/dbConfig");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash= require("express-flash");

const app = express();

const PORT= process.env.PORT || 4000;
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}));

app.use(session({
    secret:'secret'
}))


app.get("/", (req,res)=> {
    res.render("index",{usuario: "que sucede"});
});
app.get("/usuario/register", (req,res)=> {
    res.render("register");
});
app.get("/usuario/login", (req,res)=> {
    res.render("login");
});
app.get("/usuario/dashboard", (req,res)=> {
    res.render("dashboard",{usuario: "que sucede"});
});


app.post ('/usuario/register',async(req,res)=>{
    console.log(req.body);
let { nombre, email, password, password2 } = req.body;
    console.log({
        nombre,
        email,
        password,
        password2
    })

    let errors =[];
    if(!nombre || !email || !password || !password2){
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
    }
    // probar la base de datos
    else{
        let hashendPassword = await bcrypt.hash(password, 10);
        console.log(hashendPassword);
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
                }
            }
        );
    }
});

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
