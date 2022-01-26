const express = require('express')
const router = express.Router()
const componenteController = require('../controllers/componente-controller')
const authController = require('../controllers/authController')



router.get('/', authController.isAuthenticated, componenteController.getComponente)
router.get('/:id', authController.isAuthenticated, componenteController.getComponenteById)
router.post('/', authController.isAuthenticated, componenteController.addComponente)
router.delete('/:id', authController.isAuthenticated, componenteController.deleteComponente)
router.put('/:id', authController.isAuthenticated, componenteController.updateComponente)

module.exports = router
