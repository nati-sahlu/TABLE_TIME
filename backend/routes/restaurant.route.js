
const express = require('express');
const router = express.Router();
const {searchRestaurants} = require('../controllers/restaurant.controller');

router.get('/restaurants', searchRestaurants);

module.exports = router;
