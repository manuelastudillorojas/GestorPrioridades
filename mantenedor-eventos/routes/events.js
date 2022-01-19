const express = require('express');
const router = express.Router();
const eventsModel = require('../model/events')

/**
 * Función auxiliar para validar campos vacíos
 */
const validaVacio = (datoIngreso) => {
  if(datoIngreso.trim() != '') {
    return true
  } else {
    return false
  }
}

/**
 * API para buscar todos los eventos
 */
router.get('/', function(req, res, next) {
  eventsModel.getEvents().then(eventos => {
    if (eventos.rows.length == 0) {
      res.send({msg : `No hay eventos registrados`, tipo: `error`})
    } else {
      res.send({datos: eventos.rows}) 
    }
  }).catch(err => {
    res.send(err)
  })
})

/**
 * Busca los eventos por ID
 */
router.get('/:id', (req, res, next) => {
  if(validaVacio(req.params.id)){
    eventsModel.getEventById(req.params.id).then(evento => {
      if(evento.rows.length == 0){
        res.send({msg : `No hay eventos registrados con el id ${req.params.id}`, tipo: `error`})
      } else {
        res.send({datos: evento.rows})
      }
    }).catch(err => {
      res.send({msg: err})
    })
  } else {
    res.send({msg: `Id vacío`, tipo: `error`})
  }
})

/**
 * Agrega un evento
 */
router.post('/', (req, res, next) => {
  if(validaVacio(req.body.descripcion) && validaVacio(req.body.hora_registro) && validaVacio(req.body.estado) && validaVacio(req.body.puntaje_prio) && validaVacio(req.body.id_cliente)
  && validaVacio(req.body.id_componente) && validaVacio(req.body.id_criticidad) && validaVacio(req.body.id_severidad)) {
    eventsModel.addEvent(req.body).then(data => {
      res.send({msg: `Datos ingresados`, tipo: `ok`})
    }).catch(err => {
      res.send({msg: err, tipo: `error`})
    })
  } else {
    res.send({msg: `Todos los datos deben contener informacion`, tipo: `error`})
  }
})

/**
 * Modifica un evento buscado por id
 */
router.put('/:id', (req, res, next) => {

  if(validaVacio(req.params.id) && validaVacio(req.body.descripcion) && validaVacio(req.body.hora_registro) && validaVacio(req.body.estado) && validaVacio(req.body.puntaje_prio) && validaVacio(req.body.id_cliente)
  && validaVacio(req.body.id_componente) && validaVacio(req.body.id_criticidad) && validaVacio(req.body.id_severidad)){
    eventsModel.updateEvent(req.params.id, req.body).then(evento => {
      res.send({msg: `Datos actualizados en ${evento.rowCount} filas`, tipo: `ok`})
    }).catch(err => {
      res.send({msg: err, tipo: `error`})
    })
  } else {
    res.send({msg: `Todos los datos deben contener informacion`, tipo: `error`})
  }
})

/**
 * Elimina un eveno buscado por id
 */
router.delete('/:id', (req, res, next) => {
  
  if(validaVacio(req.params.id)) {
    eventsModel.deleteEvent(req.params.id).then(evento => {
      res.send({msg: `Cantidad de filas eliminadas: ${evento.rowCount}`, tipo: `ok`})
    }).catch(err => {
      res.send({msg: err, tipo: `error`})
    })
  } else {
    res.send({msg: `Id vacío`, tipo: `error`})
  }
})

module.exports = router;
