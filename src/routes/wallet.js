const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

// Create wallet
router.post('/create', walletController.createWallet);

// Get wallet details
router.get('/:userId', walletController.getWalletDetails);

// Get balance
router.get('/balance/:walletId', walletController.getBalance);

module.exports = router;
