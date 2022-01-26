const express = require('express')
const router = express.Router()
const componenteController = require('../controllers/componente-controller')
const authController = require('../controllers/authController')



router.get('/', authController.isAuthenticated('oper'), componenteController.getComponente)
router.get('/:id', authController.isAuthenticated('oper'), componenteController.getComponenteById)
router.post('/', authController.isAuthenticated('admin'), componenteController.addComponente)
router.delete('/:id', authController.isAuthenticated('admin'), componenteController.deleteComponente)
router.put('/:id', authController.isAuthenticated('admin'), componenteController.updateComponente)

module.exports = router
