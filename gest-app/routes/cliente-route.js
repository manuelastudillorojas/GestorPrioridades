const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clientes-controller')
const authController = require('../controllers/authController')



router.get('/', authController.isAuthenticated, clienteController.getClientes)
router.get('/:id', authController.isAuthenticated, clienteController.getClientesById)
router.post('/', authController.isAuthenticated, clienteController.addCliente)
router.delete('/:id', authController.isAuthenticated, clienteController.deleteCliente)
router.put('/:id', authController.isAuthenticated, clienteController.updateCliente)

module.exports = router
