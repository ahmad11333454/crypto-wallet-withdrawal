const Wallet = require('../models/Wallet');
const { ethers } = require('ethers');
const encryption = require('../utils/encryption');

// Create new wallet
exports.createWallet = async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check if wallet already exists
    const existingWallet = await Wallet.findOne({ userId });
    if (existingWallet) {
      return res.status(400).json({ message: 'Wallet already exists for this user' });
    }

    // Generate new wallet
    const newWallet = ethers.Wallet.createRandom();
    const encryptedKey = encryption.encrypt(newWallet.privateKey);

    // Save to database
    const wallet = new Wallet({
      userId,
      address: newWallet.address,
      encryptedPrivateKey: encryptedKey,
      publicKey: newWallet.publicKey
    });

    await wallet.save();
    res.status(201).json({
      message: 'Wallet created successfully',
      address: wallet.address,
      publicKey: wallet.publicKey
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get wallet balance
exports.getBalance = async (req, res) => {
  try {
    const { walletId } = req.params;
    const wallet = await Wallet.findById(walletId);
    
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    res.json({
      address: wallet.address,
      balance: wallet.balance,
      currency: wallet.currency
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get wallet details
exports.getWalletDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const wallet = await Wallet.findOne({ userId }).select('-encryptedPrivateKey');
    
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
