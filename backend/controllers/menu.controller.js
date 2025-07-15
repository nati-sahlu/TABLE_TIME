const menuService = require("../services/menu.service");

async function fetchMenu(req, res) {
  const restaurantId = req.params.id;

  try {
    const menu = await menuService.getMenuByRestaurantId(restaurantId);
    res.status(200).json(menu);
  } catch (err) {
    console.error("Fetch menu error:", err);
    res.status(500).json({ status: "error", message: "Failed to fetch menu" });
  }
}

async function addMenuItem(req, res) {
  const restaurantId = req.params.id;
  const { name, price, photo_url } = req.body;

  try {
    await menuService.createMenuItem(restaurantId, name, price, photo_url);
    res.status(201).json({ status: "success", message: "Menu item added" });
  } catch (err) {
    console.error("Add menu item error:", err);
    res.status(500).json({ status: "error", message: "Failed to add menu item" });
  }
}

async function deleteMenuItem(req, res) {
  const { id } = req.params;

  try {
    await menuService.deleteMenuItem(id); 
    res.status(200).json({ status: "success", message: "Item deleted" });
  } catch (err) {
    console.error("Delete menu item error:", err);
    res.status(500).json({ status: "error", message: "Failed to delete item" });
  }
}

module.exports = {
  fetchMenu,
  addMenuItem,
  deleteMenuItem,
};
