
const orderService = require('../services/order.service');

async function placeOrder(req, res) {
	const { user_id, menu_item_id } = req.body;
	
	if (!user_id || !menu_item_id) {
		return res.status(400).json({ status: 'error', message: 'user_id and menu_item_id re required' });
	}


	try {
		const result = await orderService.placeOrder(user_id, menu_item_id);
    res.status(201).json(result);
	} catch (err) {
		res.status(500).json({ status: 'error', message: 'Something went wrong' });
	}
}


async function getUserOrders(req, res) {
	const userId = req.params.user_id;

	try {
		const orders = await orderService.getOrdersByUserId(userId);
		res.status(200).json({ status: 'success', orders });
	} catch (err) {
		res.status(500).json({ status: 'error', message: 'Unable to retrive orders' });
	}
}


module.exports = {
	placeOrder,
	getUserOrders
};
