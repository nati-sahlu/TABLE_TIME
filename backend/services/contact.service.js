const db = require('../config/db.config');

async function saveMessage(name, email, message) {
    const sql = `INSERT INTO messages (name, email, message) VALUES (?, ?, ?)`;
    await db.query(sql, [name, email, message]);
    return { status: 'success', message: 'Message received' };
}

module.exports = {
    saveMessage
};
