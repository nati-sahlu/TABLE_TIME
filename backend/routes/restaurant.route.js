
const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurant.controller');

router.get('/search', controller);
router.get('/restaurants/:id/details', controller.fetchRestaurantWithMenu);

module.exports = router;
