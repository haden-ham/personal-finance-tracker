const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

// GET all transactions for the logged-in user
router.get('/transactions', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// POST a new transaction
router.post('/transactions', auth, async (req, res) => {
  try {
    const { description, amount, category, type } = req.body;
    const newTransaction = new Transaction({
      description,
      amount,
      category,
      type,
      userId: req.user.id, // Set userId from token
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create transaction' });
  }
});

module.exports = router;


