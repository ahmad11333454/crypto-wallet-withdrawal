const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
    required: true
  },
  toAddress: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    enum: ['ETH', 'BTC', 'USDC', 'DAI'],
    required: true
  },
  transactionHash: String,
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  fee: {
    type: String,
    default: '0'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
});

module.exports = mongoose.model('Withdrawal', withdrawalSchema);
