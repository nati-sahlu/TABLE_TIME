const express = require('express');
const router = express.Router();
const { fetchMenu, addMenuItem } = require('../controllers/menu.controller');
const { deleteMenuItem } = require("../controllers/menu.controller");

router.get('/restaurants/:id/menu', fetchMenu);
router.post('/restaurants/:id/menu', addMenuItem);
router.delete("/menu/:id", deleteMenuItem);

module.exports = router;
