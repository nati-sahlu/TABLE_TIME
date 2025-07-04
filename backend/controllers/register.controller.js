const { registerUser } = require('../services/register.service');

async function register(req, res) {
	const { name, email, password } = req.body;
	const role = req.params.role;

	try {
		const result = await registerUser({ name, email, password, role });
		res.status(200).json({ status: 'success', message: 'registered' });
	} catch (error) {
		res.status(500).json({ status: 'error', message: error.message });
	}
}

module.exports = { register };
