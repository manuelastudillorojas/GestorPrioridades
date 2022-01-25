const express = require('express')
const router = express.Router()
const componenteController = require('../controllers/componente-controller')


router.get('/', componenteController.getComponente)
router.get('/:id', componenteController.getComponenteById)
router.post('/', componenteController.addComponente)
router.delete('/:id', componenteController.deleteComponente)
router.put('/:id', componenteController.updateComponente)

module.exports = router
