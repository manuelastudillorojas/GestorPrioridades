const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuario-controller')


router.get('/', usuarioController.getUsuarios)
router.get('/:id', usuarioController.getUsuarioById)
router.post('/', usuarioController.addUsuario)
router.put('/:id', usuarioController.updateUsuario)
router.delete('/:id', usuarioController.deleteUsuario)

module.exports = router
