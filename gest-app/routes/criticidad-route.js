const express = require('express')
const router = express.Router()
const criticidadController = require('../controllers/criticidad-controller')
const authController = require('../controllers/authController')



router.get('/', authController.isAuthenticated, criticidadController.getCriticidad)
router.get('/:id', authController.isAuthenticated, criticidadController.getCriticidadId)
router.post('/', authController.isAuthenticated, criticidadController.addCriticidad)
router.delete('/:id', authController.isAuthenticated, criticidadController.deleteCriticidad)
router.put('/:id', authController.isAuthenticated, criticidadController.updateCriticidad)

module.exports = router
