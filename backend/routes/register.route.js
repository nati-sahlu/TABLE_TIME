const express = require('express');
const router = express.Router();
const { register } = require('../controllers/register.controller');

router.post('/:role/register', register);

module.exports = router;
