const express = require('express');
const router = express.Router();
const withdrawalController = require('../controllers/withdrawalController');

// Initiate withdrawal
router.post('/initiate', withdrawalController.initiateWithdrawal);

// Get withdrawal status
router.get('/status/:withdrawalId', withdrawalController.getWithdrawalStatus);

// Get withdrawal history
router.get('/history/:walletId', withdrawalController.getWithdrawalHistory);

module.exports = router;
