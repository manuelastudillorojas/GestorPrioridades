const express = require('express')
const router = express.Router()
const eventoComponenteController = require('../controllers/evento_componente-controller')
const authController = require('../controllers/authController')


router.get('/', authController.isAuthenticated('oper'), eventoComponenteController.getEventoComponente)
router.get('/:id', authController.isAuthenticated('oper'), eventoComponenteController.getEventoComponenteById)
router.get('/evento/:id_evento', authController.isAuthenticated('oper'), eventoComponenteController.getEventoComponenteByIdEvento)
router.get('/componente/:id_componente', authController.isAuthenticated('oper'), eventoComponenteController.getEventoComponenteByIdComponente)
router.post('/', authController.isAuthenticated('admin'), eventoComponenteController.addEventoComponente)
router.delete('/:id', authController.isAuthenticated('admin'), eventoComponenteController.deleteEventoComponente)
router.put('/:id', authController.isAuthenticated('admin'), eventoComponenteController.updateEventoComponente)

module.exports = router
