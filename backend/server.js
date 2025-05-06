const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads your .env variables

// Import the Transaction and Auth models
const Transaction = require('./models/Transaction');

const app = express();
const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT not set
const dbURI = process.env.MONGO_URI; // Your MongoDB URI

// Middleware
app.use(cors());
app.use(express.json());

// Connect the routes
const transactionRoutes = require('./routes/transactions');
app.use('/api', transactionRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Routes (example placeholder route)
app.get('/', (req, res) => {
  res.send('Welcome to the Personal Finance Tracker API');
});

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    // Start the server only after successful connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });


// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    // Start server only after DB connection is successful
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
