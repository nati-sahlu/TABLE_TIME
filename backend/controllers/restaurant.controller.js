
const restaurantService = require('../services/restaurant.service');

async function searchRestaurants(req, res) {
	try {
		const { query, status } = req.query;
		const results = await restaurantService.getRestaurantsBySearch(query, status);
		res.status(200).json(results);
	} catch (err) {
		console.error('its controller error:',err);
		res.status(500).json({ message: 'Error searching restaurants' });
	}
}



module.exports = {
	searchRestaurants,
};
