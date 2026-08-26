const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.registerProvider);
router.post('/login', authController.loginProvider);

module.exports = router;
