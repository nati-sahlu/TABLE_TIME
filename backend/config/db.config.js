const mysql = require('mysql2/promise');

const dbConfig = {
	connectionLimit: 10,
	socketPath: process.env.DB_SOCKET_PATH,
	password: process.env.DB_PASSWORD,
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
};

const pool = mysql.createPool(dbConfig);

async function query(sql, params) {
	const [rows] = await pool.execute(sql, params);
	return rows;
}

module.exports = { query };
