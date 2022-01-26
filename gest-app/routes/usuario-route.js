const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuario-controller')
const authController = require('../controllers/authController')


router.get('/', authController.isAuthenticated('oper'), usuarioController.getUsuarios)
router.get('/:id', authController.isAuthenticated('oper'), usuarioController.getUsuarioById)
router.post('/', authController.isAuthenticated('admin'), usuarioController.addUsuario)
router.put('/:id', authController.isAuthenticated('admin'), usuarioController.updateUsuario)
router.delete('/:id', authController.isAuthenticated('admin'), usuarioController.deleteUsuario)

module.exports = router
