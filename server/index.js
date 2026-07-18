require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = async () => {
  const db = require('./config/db');
  await db();
};

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/enquiries', require('./routes/enquiries'));

// Status / Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FreshMart API is running and connected' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
