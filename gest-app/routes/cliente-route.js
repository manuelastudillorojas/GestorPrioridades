const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clientes-controller')
const authController = require('../controllers/authController')



router.get('/', authController.isAuthenticated('oper'), clienteController.getClientes)
router.get('/:id', authController.isAuthenticated('oper'), clienteController.getClientesById)
router.post('/', authController.isAuthenticated('admin'), clienteController.addCliente)
router.delete('/:id', authController.isAuthenticated('admin'), clienteController.deleteCliente)
router.put('/:id', authController.isAuthenticated('admin'), clienteController.updateCliente)

module.exports = router
