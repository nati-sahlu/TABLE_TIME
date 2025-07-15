const express = require('express');
const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  getOrdersByRestaurant,
  acceptOrder,
} = require('../controllers/order.controller');

router.post('/orders', placeOrder);

router.get('/orders/:user_id', getUserOrders);

router.get('/orders/restaurant/:restaurant_id', getOrdersByRestaurant);

router.put('/orders/accept/:order_id', acceptOrder);
router.get('/orders/restaurant-owner/:owner_id', getOrdersByRestaurant);

module.exports = router;
