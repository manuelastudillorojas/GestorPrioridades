const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')


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
const customRouter = require('./routes/custom-routes')


const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());


app.use('/evento', eventsRouter)
app.use('/usuario', usuarioRouter)
app.use('/cliente', clienteRouter)
app.use('/criticidad', criticidadRouter)
app.use('/deadline', deadlineRouter)
app.use('/severidad', severidadRouter)
app.use('/componente', componenteRouter)
app.use('/evento-componente', eventoComponenteRouter)
app.use('/auth', authRouter)
app.use('/custom', customRouter)



const ds = require('./datasource/newrelic')
const { fstat } = require('fs')

//Datos de prueba

const id_cliente = 5

ds.getOpenIncidentesFromNRV1(1).then(eventos => {

  eventos.forEach(evento => {
    ds.getCriticidad('nombre', evento.criticidad, id_cliente).then(crit => {

      ds.getSeveridad('id_criticidad', crit[0].id).then(sev => {
    
        ds.buscarComponentes(evento.descripcion, id_cliente).then(comps => {

          evento.id_criticidad = crit[0].id
          evento.id_cliente = id_cliente
          evento.id_severidad = sev[0].id
         // evento.id_componente = comps.id
          evento.componente = []

          if(comps.length > 0) {
            
            comps.forEach(compAux => {
              evento.componente.push({
                'id': compAux.id,
                'nombre': compAux.nombre,
                'puntos': compAux.puntos
              })
            })

            ds.calculaPuntaje(id_cliente, sev[0].id, crit[0].id, evento.componente, evento.hora_registro)
          } else {
            evento.componente = ['no se detectaron componentes']
          }
          console.log(evento)
        })
      })     
    })
  });
})


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