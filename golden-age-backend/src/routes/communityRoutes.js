const express = require('express');
const router = express.Router();
// Example inside src/routes/authRoutes.js or src/controllers/authController.js
const { User } = require('../database/models');
const communityController = require('../controllers/communityController');

router.get('/listings', communityController.getListings);
router.post('/bookings', communityController.createBooking);
router.post('/service-requests', communityController.createServiceRequest);
router.post('/seed', communityController.seedData);

module.exports = router;
