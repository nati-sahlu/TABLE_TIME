const db = require('../config/db.config');



async function placeOrder(userId, menuItemId) {
		const sql = `INSERT INTO orders (user_id, menu_item_id) VALUES (?, ?)`;
	const [result]	= await db.query(sql, [userId, menuItemId]);
		return { status: 'success', order_id: result.insertId ' };

}



async function getOrdersByUserId(userId) {
	const sql = `
      SELECT orders.id AS order_id,menu_items.name AS menu_name,menu_items.photo_url,menu_items.price,orders.status
      FROM orders JOIN menu_items ON orders.menu_item_id = menu_items.id
      WHERE orders.user_id = ?
      ORDER BY orders.created_at DESC`;

	const results = await db.query(sql, [userId]);
	return results;
}



async function getRestaurantIdByOwner(ownerId) {
	const sql = `SELECT id FROM restaurants WHERE owner_id = ?`
	const [rows] = await db.query(sql, [ownerId]);
	return rows.length > 0 ? rows[0].id : null;
}

sync function getOrdersByRestaurantId(restaurantId) {
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
