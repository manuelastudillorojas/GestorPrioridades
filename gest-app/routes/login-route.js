const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')


//router controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/verifyToken', authController.verifyToken)


router.get('/test', authController.isAuthenticated('admin'), (req, res) => {
    res.send('logeado')
})

module.exports= router

