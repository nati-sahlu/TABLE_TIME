const db = require('../config/db.config');

async function registerUser({ name, email, password, role, location }) {
  const insertUserSQL = `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`;
  const [userResult] = await db.query(insertUserSQL, [name, email, password, role]);

  if (role === 'owner') {
    const ownerId = userResult.insertId;
    const insertRestaurantSQL = `
      INSERT INTO restaurants (name, location, owner_id, status)
      VALUES (?, ?, ?, ?)`;
    await db.query(insertRestaurantSQL, [`${name}'s Restaurant`, location, ownerId, 'open']);
  }
}



module.exports = { registerUser };
