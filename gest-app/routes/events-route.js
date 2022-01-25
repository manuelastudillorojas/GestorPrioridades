const express = require('express')
const router = express.Router()
const eventoController = require('../controllers/evento-controller')


router.get('/', eventoController.getEvents)
router.get('/:id', eventoController.getEventById)
router.post('/', eventoController.addEvent)
router.put('/:id', eventoController.updateEvent)
router.delete('/:id', eventoController.deleteEvent)

module.exports = router
