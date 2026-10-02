
// Example inside src/routes/authRoutes.js or src/controllers/authController.js

const express = require('express');
const { User } = require('../database/models');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.registerProvider);
router.post('/login', authController.loginProvider);

module.exports = router;
