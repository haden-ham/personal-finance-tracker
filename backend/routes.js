// backend/routes.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Sample route to get all transactions
router.get('/transactions', (req, res) => {
  // Sample data (in a real app, this would be fetched from a database)
  const transactions = [
    { id: 1, name: 'Groceries', amount: 50 },
    { id: 2, name: 'Coffee', amount: 5 },
  ];
  res.json(transactions);
});

// Sample route to add a new transaction
router.post('/transactions', (req, res) => {
  const { name, amount } = req.body;
  // Simulate saving the data to a database
  const newTransaction = { id: Date.now(), name, amount };
  res.status(201).json(newTransaction);
});

module.exports = router;
