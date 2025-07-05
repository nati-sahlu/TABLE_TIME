const db = require('../config/db.config');

async function getRestaurantsBySearch(query, status) {
	let sql = 'SELECT * FROM restaurants WHERE 1=1';
	const params = [];

	if (query) {
		sql += ' AND name LIKE ?';
		params.push(`%${query}%`);
	}

	if (status) {
		sql += ' AND is_open = ?';
		params.push(status === 'open' ? 1 : 0);
	}

	const results = await db.query(sql, params);
	return results;
}


async function getRestaurantWithMenu(id) {
	try {
		const restaurant = await db.query(`SELECT * FROM restaurants WHERE id = ?`, [id]);
		const menu = await db.query(`SELECT * FROM menu WHERE restaurant_id = ?`, [id]);

		return {
			restaurant: restaurant[0],menu
		};
	} catch (err) {
		console.error("Error in getRestaurantWithMenu:", err);
		throw err;
	}
}

module.exports = {
	getRestaurantsBySearch,
	getRestaurantWithMenu
};
