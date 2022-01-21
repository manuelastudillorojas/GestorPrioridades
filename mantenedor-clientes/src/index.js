const express = require('express');
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// rutas
app.use(require('./routes/clientes'));
app.use(require('./routes/criticidad'));
app.use(require('./routes/deadline'));
app.use(require('./routes/severidad'));



app.listen(3000);
console.log('servidor en el puerto 3000')