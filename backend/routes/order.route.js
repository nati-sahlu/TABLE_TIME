const express = require('express');
const router = express.Router();

const {placeOrder, getUserOrders} = require('../controllers/order.controller');

router.post('/orders', placeOrder);

router.get('/orders/:user_id', getUserOrders);

module.exports = router;
