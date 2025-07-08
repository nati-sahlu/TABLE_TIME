const { generateToken } = require("../utils/token");
const { registerUser } = require('../services/register.service');

async function register(req, res) {
	const { name, email, password } = req.body;
	const role = req.params.role;

	try {
		const newUser = await registerUser({ name, email, password, role });
		const token = generateToken({
			id: newUser.id,
			email: newUser.email,
			role: role,
		});

		res.status(200).json({ status: 'success', message: 'registered', token: token });
	} catch (error) {
		res.status(500).json({ status: 'error', message: error.message });
	}
}

module.exports = { register };
