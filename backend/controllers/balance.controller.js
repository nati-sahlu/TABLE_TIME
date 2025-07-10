const db = require('../config/db.config');

async function getBalance(req, res) {
  const { userId } = req.params;
  const [rows] = await db.query("SELECT balance FROM users WHERE id = ?", [userId]);
  res.json({ balance: rows[0]?.balance || 0 });
}

async function depositBalance(req, res) {
  const { userId } = req.params;
  const { amount } = req.body;
  await db.query("UPDATE users SET balance = balance + ? WHERE id = ?", [amount, userId]);
  res.json({ status: 'success' });
}

async function withdrawBalance(req, res) {
  const { userId } = req.params;
  const { amount } = req.body;
  await db.query("UPDATE users SET balance = balance - ? WHERE id = ? AND balance >= ?", [amount, userId, amount]);
  res.json({ status: 'success' });
}

module.exports = { getBalance, depositBalance, withdrawBalance };
