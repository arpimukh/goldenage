const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

router.get('/listings', communityController.getListings);
router.post('/bookings', communityController.createBooking);
router.post('/service-requests', communityController.createServiceRequest);
router.post('/seed', communityController.seedData);

module.exports = router;
