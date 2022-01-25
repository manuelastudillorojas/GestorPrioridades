const express = require('express')
const router = express.Router()
const severidadController = require('../controllers/severidad-controller')

router.get('/', severidadController.getSeveridad);
router.get('/:id', severidadController.getSeveridadById);
router.post('/', severidadController.addSeveridad);
router.delete('/:id', severidadController.deleteSeveridad);
router.put('/:id', severidadController.updateSeveridad);

module.exports = router;
