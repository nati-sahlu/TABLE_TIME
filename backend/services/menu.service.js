const db = require('../config/db.config');


async function getMenuByRestaurantId(restaurantId) {
	const sql = 'SELECT * FROM menu_items WHERE restaurant_id = ?';
	const [result] = await db.query(sql, [restaurantId]);
	return result;
}


async function createMenuItem(restaurantId, name, price, photo_url) {
	const sql = `
		INSERT INTO menu_items (restaurant_id, name, price, photo_url)
		VALUES (?, ?, ?, ?)
	`;
	await db.query(sql, [restaurantId, name, price, photo_url || null]);
}

async function deleteMenuItem(id) {
  const sql = "DELETE FROM menu_items WHERE id = ?";
  await db.query(sql, [id]);
}
module.exports = {
  getMenuByRestaurantId,
  createMenuItem,
  deleteMenuItem
};
