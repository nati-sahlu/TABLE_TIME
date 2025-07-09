
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


async function getOrdersByRestaurant(req, res) {
  const ownerId = req.params.owner_id;

  try {
    const restaurantId = await orderService.getRestaurantIdByOwner(ownerId);
    if (!restaurantId) {
      return res.status(404).json({ status: "error", message: "Restaurant not found" });
    }

    const orders = await orderService.getOrdersByRestaurantId(restaurantId);
    res.status(200).json({ status: "success", orders });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Unable to retrieve orders" });
  }
}


async function acceptOrder(req, res) {
  const orderId = req.params.order_id;

  try {
    await orderService.acceptOrder(orderId);
    res.status(200).json({ status: "success", message: "Order accepted" });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Unable to accept order" });
  }
}

module.exports = {
	placeOrder,
	getUserOrders,
	getOrdersByRestaurant,
	acceptOrder,
};
