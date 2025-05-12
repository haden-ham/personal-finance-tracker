import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const incomeCategories = ['Salary', 'Bonus', 'Interest', 'Gift', 'Other'];
  const expenseCategories = ['Groceries', 'Rent', 'Utilities', 'Entertainment', 'Travel', 'Other'];

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        setTransactions(res.data);
      } else {
        console.error('Failed to fetch transactions');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetchTransactions();
  }, [navigate, token, fetchTransactions]);

  const handleAddOrUpdateTransaction = async (e) => {
    e.preventDefault();

    const transactionData = { description, amount, category, type, date };

    try {
      if (editId) {
        // Update
        await axios.put(`http://localhost:3000/api/transactions/${editId}`, transactionData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditId(null);
      } else {
        // Create
        await axios.post('http://localhost:3000/api/transactions', transactionData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setDescription('');
      setAmount('');
      setCategory('');
      setType('');
      setDate('');
      fetchTransactions();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleEdit = (txn) => {
    setEditId(txn._id);
    setDescription(txn.description);
    setAmount(txn.amount);
    setCategory(txn.category);
    setType(txn.type);
    setDate(txn.date ? txn.date.slice(0, 10) : '');
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setDescription('');
    setAmount('');
    setCategory('');
    setType('');
    setDate('');
  };

  const handleDeleteTransaction = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTransactions();
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const getCategoryOptions = () => {
    if (type === 'income') return incomeCategories;
    if (type === 'expense') return expenseCategories;
    return [];
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome! You are logged in.</p>
      <button onClick={handleLogout}>Logout</button>

      <h3>{editId ? 'Edit Transaction' : 'Add Transaction'}</h3>
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
        <select value={type} onChange={(e) => { setType(e.target.value); setCategory(''); }} required>
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {getCategoryOptions().map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
        {editId && <button type="button" onClick={handleCancelEdit}>Cancel</button>}
      </form>

      <h3>Your Transactions</h3>
      <ul>
        {transactions.map((txn) => (
          <li key={txn._id}>
            {txn.description} - ${txn.amount} - {txn.category} - {txn.type} - {txn.date?.slice(0, 10)}
            <button onClick={() => handleEdit(txn)}>Edit</button>
            <button onClick={() => handleDeleteTransaction(txn._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
