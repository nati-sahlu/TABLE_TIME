async function getMenuByRestaurantId(restaurantId) {
  const sql = 'SELECT * FROM menu_items WHERE restaurant_id = ?';
  const result = await db.query(sql, [restaurantId]);
  return result;
}
