// server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Enable CORS to handle cross-origin requests (for frontend)
app.use(cors());

// Middleware to parse JSON data from incoming requests
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Personal Finance Tracker API!');
});

// Example API route for creating a transaction
app.post('/transactions', (req, res) => {
  const { description, amount } = req.body;

  // This will store transactions temporarily in memory
  // (We'll add a database later)
  const newTransaction = { description, amount, id: Date.now() };
  res.status(201).json(newTransaction);
});

// Example API route to fetch all transactions
app.get('/transactions', (req, res) => {
  // For now, return a placeholder response
  res.json([{ id: 1, description: 'Lunch', amount: 12.5 }]);
});

// Set the port for the server
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
