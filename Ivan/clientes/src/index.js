const express = require('express');
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// rutas
app.use(require('./routes/index'));

app.listen(3000);
console.log('servidor en el puerto 3000')