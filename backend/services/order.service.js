const db = require("../config/db.config");

// 1. Place a new order
async function placeOrder(userId, menuItemId) {
  const sql = `
    INSERT INTO orders (user_id, menu_item_id, status)
    VALUES (?, ?, 'pending')
  `;
  const [result] = await db.query(sql, [userId, menuItemId]);
  return { status: "success", order_id: result.insertId };
}

// 2. Get all orders by a user
async function getOrdersByUserId(userId) {
  const sql = `
    SELECT o.id as order_id, o.status, m.name as menu_name, r.name as restaurant_name
    FROM orders o
    JOIN menu_items m ON o.menu_item_id = m.id
    JOIN restaurants r ON m.restaurant_id = r.id
    WHERE o.user_id = ?
    ORDER BY o.id DESC
  `;
  const [rows] = await db.query(sql, [userId]);
  return rows;
}

async function getRestaurantIdByOwner(ownerId) {
  const sql = `SELECT id FROM restaurants WHERE owner_id = ?`;
  const [rows] = await db.query(sql, [ownerId]);
  return rows.length > 0 ? rows[0].id : null;
}

async function getOrdersByRestaurantId(restaurantId) {
  const sql = `
    SELECT o.id as order_id, o.status, m.name as menu_name
    FROM orders o
    JOIN menu_items m ON o.menu_item_id = m.id
    WHERE m.restaurant_id = ?
    ORDER BY o.id DESC
  `;
  const [rows] = await db.query(sql, [restaurantId]);
  return rows;
}

async function acceptOrder(orderId) {
  const sql = `UPDATE orders SET status = 'delivered' WHERE id = ?`;
  await db.query(sql, [orderId]);
}

module.exports = {
  placeOrder,
  getOrdersByUserId,
  getRestaurantIdByOwner,
  getOrdersByRestaurantId,
  acceptOrder,
};
