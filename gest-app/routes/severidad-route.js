const express = require('express')
const router = express.Router()
const severidadController = require('../controllers/severidad-controller')
const authController = require('../controllers/authController')


router.get('/', authController.isAuthenticated('oper'), severidadController.getSeveridad)
router.get('/:id', authController.isAuthenticated('oper'), severidadController.getSeveridadById)
router.post('/', authController.isAuthenticated('admin'), severidadController.addSeveridad)
router.delete('/:id', authController.isAuthenticated('admin'), severidadController.deleteSeveridad)
router.put('/:id', authController.isAuthenticated('admin'), severidadController.updateSeveridad)

module.exports = router
