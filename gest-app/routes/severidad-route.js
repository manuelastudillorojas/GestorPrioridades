const express = require('express')
const router = express.Router()
const severidadController = require('../controllers/severidad-controller')
const authController = require('../controllers/authController')


router.get('/', authController.isAuthenticated, severidadController.getSeveridad)
router.get('/:id', authController.isAuthenticated, severidadController.getSeveridadById)
router.post('/', authController.isAuthenticated, severidadController.addSeveridad)
router.delete('/:id', authController.isAuthenticated, severidadController.deleteSeveridad)
router.put('/:id', authController.isAuthenticated, severidadController.updateSeveridad)

module.exports = router
