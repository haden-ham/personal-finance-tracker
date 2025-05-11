import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');

  const incomeCategories = ['Salary', 'Bonus', 'Freelance', 'Investment'];
  const expenseCategories = ['Groceries', 'Rent', 'Utilities', 'Transport', 'Dining'];

  const filteredCategories = type === 'income' ? incomeCategories : type === 'expense' ? expenseCategories : [];

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleAddOrUpdateTransaction = async (e) => {
    e.preventDefault();

    const transactionData = { description, amount, category, type };

    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/api/transactions/${editingId}`, transactionData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:3000/api/transactions', transactionData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setDescription('');
      setAmount('');
      setCategory('');
      setType('');
      fetchTransactions();
    } catch (err) {
      console.error('Error submitting transaction:', err);
    }
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction._id);
    setDescription(transaction.description);
    setAmount(transaction.amount);
    setCategory(transaction.category);
    setType(transaction.type);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTransactions();
    } catch (err) {
      console.error('Failed to delete transaction:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDescription('');
    setAmount('');
    setCategory('');
    setType('');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>{editingId ? 'Edit Transaction' : 'Add Transaction'}</h3>
      <form onSubmit={handleAddOrUpdateTransaction}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {filteredCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && (
          <button type="button" onClick={handleCancelEdit}>Cancel</button>
        )}
      </form>

      <h3>Your Transactions</h3>
      <ul>
        {transactions.map((txn) => (
          <li key={txn._id}>
            {txn.description} - ${txn.amount} ({txn.category}, {txn.type})
            <button onClick={() => handleEdit(txn)}>Edit</button>
            <button onClick={() => handleDelete(txn._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
