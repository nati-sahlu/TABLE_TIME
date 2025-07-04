const db = require('../config/db.config');

async function registerUser({ name, email, password, role }) {
  const sql = 'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)';
  await db.query(sql, [name, email, password, role]);
}

module.exports = { registerUser };
