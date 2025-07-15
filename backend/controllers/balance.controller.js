const db = require('../config/db.config');

async function getBalance(req, res) {
  try {
    const { userId } = req.params;
    const [rows] = await db.query("SELECT balance FROM users WHERE id = ?", [userId]);

    if (!rows.length) {
      return res.status(404).json({ status: "failure", message: "User not found" });
    }

    res.json({ balance: rows[0].balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

async function depositBalance(req, res) {
  try {
    const { userId } = req.params;
    const { amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ status: "failure", message: "Invalid deposit amount" });
    }

    const [result] = await db.query(
      "UPDATE users SET balance = balance + ? WHERE id = ?",
      [amount, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: "failure", message: "User not found" });
    }

    res.json({ status: 'success' });
  } catch (error) {
    console.error("Error during deposit:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

async function withdrawBalance(req, res) {
  try {
    const { userId } = req.params;
    const { amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ status: "failure", message: "Invalid withdrawal amount" });
    }

    // Check balance first
    const [[user]] = await db.query("SELECT balance FROM users WHERE id = ?", [userId]);

    if (!user) {
      return res.status(404).json({ status: "failure", message: "User not found" });
    }

    if (user.balance < amount) {
      return res.status(400).json({ status: "failure", message: "Insufficient balance" });
    }

    // Proceed with withdrawal
    await db.query("UPDATE users SET balance = balance - ? WHERE id = ?", [amount, userId]);

    res.json({ status: 'success' });
  } catch (error) {
    console.error("Error during withdrawal:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

module.exports = { getBalance, depositBalance, withdrawBalance };
