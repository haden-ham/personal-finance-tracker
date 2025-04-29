const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // <-- This line loads your .env variables

// Import the Transaction model
const Transaction = require('./models/Transaction');

const app = express();
const PORT = process.env.PORT || 5000; // fallback to 5000 if PORT not set
const dbURI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes (example placeholder route)
app.get('/', (req, res) => {
  res.send('Welcome to the Personal Finance Tracker API');
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
