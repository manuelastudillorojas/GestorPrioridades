const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuario-controller')


router.get('/', usuarioController.getUsuarios)
router.get('/:mail', usuarioController.getUsuarioByEmail)
router.post('/', usuarioController.addUsuario)
router.put('/:mail', usuarioController.updateUsuario)
router.delete('/:mail', usuarioController.deleteUsuario)

module.exports = router
