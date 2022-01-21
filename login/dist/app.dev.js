"use strict";

var express = require('express');

var dotenv = require('dotenv');

var cookieParser = require('cookie-parser');

var app = express(); //seteamos el motor de plantillas

app.set('view engine', 'ejs'); //seteamos la carpeta public para archivos estáticos

app.use(express["static"]('public')); //para procesar datos enviados desde forms

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json()); //seteamos las variables de entorno

dotenv.config({
  path: './env/.env'
}); //para poder trabajar con las cookies

app.use(cookieParser()); //llamar al router

app.use('/', require('./routes/router'));
app.listen(4000, function () {
  console.log('server ok');
});