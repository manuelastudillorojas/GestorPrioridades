const express = require('express')
const router = express.Router()
const deadlineController = require('../controllers/deadline-controller')
const authController = require('../controllers/authController')


router.get('/', authController.isAuthenticated, deadlineController.getDeadline)
router.get('/:id', authController.isAuthenticated, deadlineController.getDeadlineById)
router.post('/', authController.isAuthenticated, deadlineController.addDeadline)
router.delete('/:id', authController.isAuthenticated, deadlineController.deleteDeadline)
router.put('/:id', authController.isAuthenticated, deadlineController.updateDeadline)

module.exports = router
