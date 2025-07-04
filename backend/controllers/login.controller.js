const { logIn } = require('../services/login.service');

async function login(req, res) {
	const { email, password } = req.body;
	const role = req.params.role;
	try {
		const result = await logIn({ email, password, role });
		if (result && result.length > 0) {
			res.status(200).json({ status: 'success', message: 'login successful', token: 'mockToken123' });
		} else {
			res.status(401).json({ status: 'failure', message: 'login failed' });
		}
	} catch (error) {
		res.status(500).json({ status: 'error', message: error.message });
	}
}

module.exports = { login };
