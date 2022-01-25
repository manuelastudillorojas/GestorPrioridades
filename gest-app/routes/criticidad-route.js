const express = require('express')
const router = express.Router()
const criticidadController = require('../controllers/criticidad-controller')


router.get('/', criticidadController.getCriticidad)
router.get('/:id', criticidadController.getCriticidadId)
router.post('/', criticidadController.addCriticidad)
router.delete('/:id', criticidadController.deleteCriticidad)
router.put('/:id', criticidadController.updateCriticidad)

module.exports = router
