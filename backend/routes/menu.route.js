const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');


router.get('/restaurants/:id/menu', menuController.fetchMenu);


module.exports = router;
