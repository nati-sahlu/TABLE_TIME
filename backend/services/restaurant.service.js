const db = require('../config/db.config');

async function getRestaurantsBySearch(query, status) {
	let sql = 'SELECT * FROM restaurants WHERE 1=1';
	const params = [];

	if (query) {
		sql += ' AND name LIKE ?';
		params.push(`%${query}%`);
	}

	if (status) {
		sql += ' AND status = ?';
		params.push(status);
	}

	const [rows] = await db.query(sql, params);
	return rows;
}



module.exports = {
	getRestaurantsBySearch,
};
