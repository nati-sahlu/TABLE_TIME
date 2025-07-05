const db = require('../config/db.config');



async function placeOrder(userId, menuItemId) {
	try {
		const sql = `INSERT INTO orders (user_id, menu_item_id) VALUES (?, ?)`;
		await db.query(sql, [userId, menuItemId]);
		return { status: 'success', message: 'Order placed' };
	} catch (err) {
		console.error("when Error placing order:", err.message);
		throw err;
	}
}



async function getOrdersByUserId(userId) {
	try {
	const sql = `
      SELECT orders.id AS order_id,menu_items.name AS menu_name,menu_items.photo_url,menu_items.price,orders.status
      FROM orders JOIN menu_items ON orders.menu_item_id = menu_items.id
      WHERE orders.user_id = ?
      ORDER BY orders.created_at DESC`;

	const results = await db.query(sql, [userId]);
	return results;
	} catch (err) {
		console.error(" Error when fetching orders:", err.message);
		throw err;
	}
}


module.exports = {
	placeOrder,
	getOrdersByUserId
};
