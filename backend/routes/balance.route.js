const express = require('express');
const router = express.Router();
const {
  getBalance,
  depositBalance,
  withdrawBalance
} = require('../controllers/balance.controller');

router.get('/balance/:userId', getBalance);
router.post('/balance/:userId/deposit', depositBalance);
router.post('/balance/:userId/withdraw', withdrawBalance);

module.exports = router;
