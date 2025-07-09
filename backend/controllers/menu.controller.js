const menuService = require('../services/menu.service');

async function fetchMenu(req, res) {
	const restaurantId  = req.params.id;
	try {
		const menu = await menuService.getMenuByRestaurantId(restaurantId);
		res.status(200).json(menu);
	} catch (err) {
		res.status(500).json({ status: 'error', message: 'Failed to fetch the menu' });
	}
}


async function addMenuItem(req, res) {
	const restaurantId = req.params.id;
	const { name, price, photo_url } = req.body;

	try {
		await menuService.createMenuItem(restaurantId, name, price, photo_url);
		res.status(201).json({ status: 'success', message: 'Menu item added successfully' });
	} catch (err) {
		res.status(500).json({ status: 'error', message: 'Failed to add menu item' });
	}
}


module.exports = {
	fetchMenu,
	addMenuItem,
};
