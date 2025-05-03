// routes/transactions.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET all transactions from the database
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// POST a new transaction to the database
router.post('/transactions', async (req, res) => {
  try {
    const { description, amount, category, type, userId } = req.body;
    const newTransaction = new Transaction({
      description,
      amount,
      category,
      type,
      userId,
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    console.error('Error creating transaction:', err); // This will help us debug
    res.status(400).json({ error: 'Failed to create transaction' });
  }
});

module.exports = router;

