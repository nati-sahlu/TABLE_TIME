const orderService = require("../services/order.service");
const db = require("../config/db.config");

async function placeOrder(req, res) {
  const { user_id, menu_item_id } = req.body;

  if (!user_id || !menu_item_id) {
    return res.status(400).json({
      status: "error",
      message: "user_id and menu_item_id are required",
    });
  }

  try {
    // Get menu item price
    const [[menuItem]] = await db.query(
      "SELECT price FROM menu_items WHERE id = ?",
      [menu_item_id]
    );

    if (!menuItem) {
      return res.status(404).json({ status: "error", message: "Menu item not found" });
    }

    const price = menuItem.price;

    // Get user's balance
    const [[user]] = await db.query(
      "SELECT balance FROM users WHERE id = ?",
      [user_id]
    );

    if (!user || user.balance < price) {
      return res.status(400).json({ status: "error", message: "Insufficient balance" });
    }

    // Place order (status: pending)
    const result = await orderService.placeOrder(user_id, menu_item_id);
    res.status(201).json(result);
  } catch (err) {
    console.error("Place order error:", err);
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
}

async function getUserOrders(req, res) {
  const userId = req.params.user_id;

  try {
    const orders = await orderService.getOrdersByUserId(userId);
    res.status(200).json({ status: "success", orders });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Unable to retrieve orders" });
  }
}

async function getOrdersByRestaurant(req, res) {
  const ownerId = req.params.owner_id;

  try {
    const restaurantId = await orderService.getRestaurantIdByOwner(ownerId);
    if (!restaurantId) {
      return res
        .status(404)
        .json({ status: "error", message: "Restaurant not found" });
    }

    const orders = await orderService.getOrdersByRestaurantId(restaurantId);
    res.status(200).json({ status: "success", orders });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Unable to retrieve orders" });
  }
}

async function acceptOrder(req, res) {
  const orderId = req.params.order_id;

  try {
    // Get order info
    const [[order]] = await db.query(
      "SELECT user_id, menu_item_id FROM orders WHERE id = ?",
      [orderId]
    );

    if (!order) {
      return res.status(404).json({ status: "error", message: "Order not found" });
    }

    const { user_id, menu_item_id } = order;

    // Get price and restaurant
    const [[menuItem]] = await db.query(
      "SELECT price, restaurant_id FROM menu_items WHERE id = ?",
      [menu_item_id]
    );

    const price = menuItem.price;
    const restaurantId = menuItem.restaurant_id;

    // Get restaurant owner
    const [[restaurant]] = await db.query(
      "SELECT owner_id FROM restaurants WHERE id = ?",
      [restaurantId]
    );

    const ownerId = restaurant.owner_id;

    // Deduct from user
    await db.query(
      "UPDATE users SET balance = balance - ? WHERE id = ?",
      [price, user_id]
    );

    // Credit owner
    await db.query(
      "UPDATE users SET balance = balance + ? WHERE id = ?",
      [price, ownerId]
    );

    // Update order status to delivered
    await orderService.acceptOrder(orderId);

    res.status(200).json({ status: "success", message: "Order accepted and balance updated" });
  } catch (err) {
    console.error("Accept order error:", err);
    res.status(500).json({ status: "error", message: "Unable to accept order" });
  }
}

module.exports = {
  placeOrder,
  getUserOrders,
  getOrdersByRestaurant,
  acceptOrder,
};
