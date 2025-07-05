const express = require('express');
const router = express.Router();
const {fetchMenu} = require('../controllers/menu.controller');


router.get('/restaurants/:id/menu', fetchMenu);

module.exports = router;
