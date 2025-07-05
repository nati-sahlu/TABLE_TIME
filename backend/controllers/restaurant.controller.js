
const restaurantService = require('../services/restaurant.service');

async function searchRestaurants(req, res) {
	try {
		const { query, status } = req.query;
		const results = await restaurantService(query, status);
		res.status(200).json(results);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error searching restaurants' });
	}
}


async function fetchRestaurantWithMenu(req, res) {
	try {
		const id = req.params.id;
		const data = await restaurantService.getRestaurantWithMenu(id);
		res.status(200).json({ status: 'success', data });
	} catch (err) {
		res.status(500).json({ status: 'error', message: err.message });
	}
}

module.exports = {
	fetchRestaurants,
	fetchRestaurantWithMenu
};
