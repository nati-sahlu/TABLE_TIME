const mysql = require("mysql2/promise");
require("dotenv").config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4",
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000,
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL server successfully!");
    connection.release();
  } catch (err) {
    console.error("Error connecting to MySQL:", err.message);
  }
};

testConnection();

module.exports = {
  query: (sql, params) => pool.execute(sql, params),
  getConnection: () => pool.getConnection(),
};
