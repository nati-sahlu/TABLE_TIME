const contactService = require('../services/contact.service');

async function sendMessage(req, res) {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    try {
        const result = await contactService.saveMessage(name, email, message);
        res.status(201).json(result);
    } catch (err) {
        console.error('Error saving message:', err.message);
        res.status(500).json({ status: 'error', message: 'Could not save message' });
    }
}

module.exports = {
    sendMessage
};
