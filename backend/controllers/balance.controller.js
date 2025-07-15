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
    const amountNum = Number(amount);

    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({ status: "failure", message: "Invalid deposit amount" });
    }

    const [result] = await db.query(
      "UPDATE users SET balance = balance + ? WHERE id = ?",
      [amountNum, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: "failure", message: "User not found" });
    }

    console.log(`User ${userId} deposited ${amountNum} ETB.`);

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
    const amountNum = Number(amount);

    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({ status: "failure", message: "Invalid withdrawal amount" });
    }

    const [rows] = await db.query("SELECT balance FROM users WHERE id = ?", [userId]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ status: "failure", message: "User not found" });
    }

    console.log(`User ${userId} requested withdrawal of ${amountNum} ETB.`);
    console.log(`Current balance: ${user.balance}`);

    if (user.balance < amountNum) {
      return res.status(400).json({ status: "failure", message: "Insufficient balance" });
    }

    const [result] = await db.query("UPDATE users SET balance = balance - ? WHERE id = ?", [amountNum, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: "failure", message: "User not found" });
    }

    console.log(`Withdrawal of ${amountNum} ETB completed for user ${userId}.`);

    res.json({ status: 'success' });
  } catch (error) {
    console.error("Error during withdrawal:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

module.exports = { getBalance, depositBalance, withdrawBalance };
