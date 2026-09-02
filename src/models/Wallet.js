const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  encryptedPrivateKey: {
    type: String,
    required: true
  },
  publicKey: {
    type: String,
    required: true
  },
  balance: {
    type: String,
    default: '0'
  },
  currency: {
    type: String,
    enum: ['ETH', 'BTC', 'USDC', 'DAI'],
    default: 'ETH'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Wallet', walletSchema);
