const express = require('express')
const router = express.Router()
const eventoController = require('../controllers/evento-controller')
const authController = require('../controllers/authController')



router.get('/', authController.isAuthenticated, eventoController.getEvents)
router.get('/:id', authController.isAuthenticated, eventoController.getEventById)
router.post('/', authController.isAuthenticated, eventoController.addEvent)
router.put('/:id', authController.isAuthenticated, eventoController.updateEvent)
router.delete('/:id', authController.isAuthenticated, eventoController.deleteEvent)

module.exports = router
