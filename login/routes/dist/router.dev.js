"use strict";

var express = require('express');

var router = express.Router();

var authController = require('../controllers/authController'); //router vista


router.get('/', authController.isAuthenticated, function (req, res) {
  res.render('index', {
    user: req.user
  });
});
router.get('/login', function (req, res) {
  res.render('login', {
    alert: false
  });
});
router.get('/register', function (req, res) {
  res.render('register');
}); //router controller

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
module.exports = router;