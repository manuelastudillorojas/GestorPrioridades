const express = require('express')
const router = express.Router()
const eventoController = require('../controllers/evento-controller')
const authController = require('../controllers/authController')



router.get('/', authController.isAuthenticated('oper'), eventoController.getEvents)
router.get('/:id', authController.isAuthenticated('oper'), eventoController.getEventById)
router.post('/', authController.isAuthenticated('admin'), eventoController.addEvent)
router.put('/:id', authController.isAuthenticated('admin'), eventoController.updateEvent)
router.delete('/:id', authController.isAuthenticated('admin'), eventoController.deleteEvent)

module.exports = router
