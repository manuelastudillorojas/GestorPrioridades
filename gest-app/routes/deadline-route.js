const express = require('express')
const router = express.Router()
const deadlineController = require('../controllers/deadline-controller')

router.get('/', deadlineController.getDeadline)
router.get('/:id', deadlineController.getDeadlineById)
router.post('/', deadlineController.addDeadline)
router.delete('/:id', deadlineController.deleteDeadline)
router.put('/:id', deadlineController.updateDeadline)

module.exports = router
