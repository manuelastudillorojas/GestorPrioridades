const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const dotenv = require('dotenv')

dotenv.config()


const eventsRouter = require('./routes/events-route')
const usuarioRouter = require('./routes/usuario-route')
const clienteRouter = require('./routes/cliente-route')
const criticidadRouter = require('./routes/criticidad-route')
const deadlineRouter = require('./routes/deadline-route')
const severidadRouter = require('./routes/severidad-route')
const componenteRouter = require('./routes/componente-route')
const eventoComponenteRouter = require('./routes/evento_componente-route')
const authRouter = require('./routes/login-route')


const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/evento', eventsRouter)
app.use('/usuario', usuarioRouter)
app.use('/cliente', clienteRouter)
app.use('/criticidad', criticidadRouter)
app.use('/deadline', deadlineRouter)
app.use('/severidad', severidadRouter)
app.use('/componente', componenteRouter)
app.use('/evento-componente', eventoComponenteRouter)
app.use('/auth', authRouter)





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app