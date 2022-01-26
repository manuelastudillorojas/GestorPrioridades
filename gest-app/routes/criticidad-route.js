const express = require('express')
const router = express.Router()
const criticidadController = require('../controllers/criticidad-controller')
const authController = require('../controllers/authController')



router.get('/', authController.isAuthenticated('oper'), criticidadController.getCriticidad)
router.get('/:id', authController.isAuthenticated('oper'), criticidadController.getCriticidadId)
router.post('/', authController.isAuthenticated('admin'), criticidadController.addCriticidad)
router.delete('/:id', authController.isAuthenticated('admin'), criticidadController.deleteCriticidad)
router.put('/:id', authController.isAuthenticated('admin'), criticidadController.updateCriticidad)

module.exports = router
