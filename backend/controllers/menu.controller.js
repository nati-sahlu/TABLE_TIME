const menuService = require('../services/menu.service');

async function fetchMenu(req, res) {
	const { id } = req.params;
	try {
		const menu = await menuService.getMenuByRestaurantId(id);
		res.json({ status: 'success', menu });
	} catch (err) {
		res.status(500).json({ status: 'error', message: err.message });
	}
}


async function addMenuItem(req, res) {
	const restaurantId = req.params.id;
	const { name, price, photo_url } = req.body;

	if (!name || !price) {
		return res.status(400).json({ status: 'error', message: 'name and price are required' });
	}

	try {
		await menuService.createMenuItem(restaurantId, name, price, photo_url);
		res.status(201).json({ status: 'success', message: 'Menu item added successfully' });
	} catch (err) {
		res.status(500).json({ status: 'error', message: err.message });
	}
}


module.exports = {
	fetchMenu,
	addMenuItem
};
