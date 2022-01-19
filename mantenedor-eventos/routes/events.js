const express = require('express');
const router = express.Router();
const eventsModel = require('../model/events')

const eventoController = require('../controllers/evento-controller')

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


router.get('/', eventoController.getEvents)
router.get('/:id', eventoController.getEventById)
router.post('/', eventoController.addEvent)
router.put('/:id', eventoController.updateEvent)
router.delete('/:id', eventoController.deleteEvent)

module.exports = router;
