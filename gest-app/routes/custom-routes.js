const express = require('express')
const router = express.Router()
const customController = require('../controllers/custom-controllers')
const authController = require('../controllers/authController')



router.get('/', authController.isAuthenticated('oper'), customController.getAllDataEventsActived)


module.exports = router
