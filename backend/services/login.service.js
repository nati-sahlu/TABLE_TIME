const db = require('../config/db.config');

async function logIn({ email, password, role }) {
  const sql = 'SELECT * FROM users WHERE email = ? AND password_hash = ? AND role = ?';
  const result = await db.query(sql, [email, password, role]);
  return result;
}

module.exports = { logIn };
