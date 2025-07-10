const { registerUser } = require('../services/register.service');

async function register(req, res) {
	const { name, email, password, location } = req.body;
	const role = req.params.role;

	try {
		const result = await registerUser({ name, email, password, role ,location});
		res.status(200).json({ status: 'success', message: 'registered' });
	} catch (error) {
		res.status(500).json({ status: 'error', message: error.message });
	}
}

module.exports = { register };
