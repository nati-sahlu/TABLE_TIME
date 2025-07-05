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
