const express = require('express');
const router = express.Router();
const {fetchMenu, addMenuItem} = require('../controllers/menu.controller');


router.get('/restaurants/:id/menu', fetchMenu);
router.post('/restaurants/:id/menu', addMenuItem);

module.exports = router;
