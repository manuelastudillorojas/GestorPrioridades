const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clientes-controller')


router.get('/', clienteController.getClientes)
router.get('/:id', clienteController.getClientesById)
router.post('/', clienteController.addCliente)
router.delete('/:id', clienteController.deleteCliente)
router.put('/:id', clienteController.updateCliente)

module.exports = router
