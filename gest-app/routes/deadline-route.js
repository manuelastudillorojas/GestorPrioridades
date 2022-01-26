const express = require('express')
const router = express.Router()
const deadlineController = require('../controllers/deadline-controller')
const authController = require('../controllers/authController')


router.get('/', authController.isAuthenticated('oper'), deadlineController.getDeadline)
router.get('/:id', authController.isAuthenticated('oper'), deadlineController.getDeadlineById)
router.post('/', authController.isAuthenticated('admin'), deadlineController.addDeadline)
router.delete('/:id', authController.isAuthenticated('admin'), deadlineController.deleteDeadline)
router.put('/:id', authController.isAuthenticated('admin'), deadlineController.updateDeadline)

module.exports = router
