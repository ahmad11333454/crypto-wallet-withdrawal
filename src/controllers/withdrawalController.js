const Withdrawal = require('../models/Withdrawal');
const Wallet = require('../models/Wallet');
const { ethers } = require('ethers');
const encryption = require('../utils/encryption');

// Initiate withdrawal
exports.initiateWithdrawal = async (req, res) => {
  try {
    const { walletId, toAddress, amount, currency } = req.body;

    // Validate inputs
    if (!ethers.isAddress(toAddress)) {
      return res.status(400).json({ message: 'Invalid destination address' });
    }

    const wallet = await Wallet.findById(walletId);
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    // Create withdrawal record
    const withdrawal = new Withdrawal({
      walletId,
      toAddress,
      amount,
      currency,
      status: 'pending'
    });

    await withdrawal.save();

    res.status(201).json({
      message: 'Withdrawal initiated',
      withdrawalId: withdrawal._id,
      status: withdrawal.status
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get withdrawal status
exports.getWithdrawalStatus = async (req, res) => {
  try {
    const { withdrawalId } = req.params;
    const withdrawal = await Withdrawal.findById(withdrawalId);
    
    if (!withdrawal) {
      return res.status(404).json({ message: 'Withdrawal not found' });
    }

    res.json(withdrawal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get withdrawal history
exports.getWithdrawalHistory = async (req, res) => {
  try {
    const { walletId } = req.params;
    const withdrawals = await Withdrawal.find({ walletId });
    
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
