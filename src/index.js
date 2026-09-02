require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const walletRoutes = require('./routes/wallet');
const withdrawalRoutes = require('./routes/withdrawal');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/wallet', walletRoutes);
app.use('/api/withdrawal', withdrawalRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Crypto Wallet API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
