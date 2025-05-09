import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchTransactions = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setTransactions(data);
        } else {
          console.error('Failed to fetch transactions');
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchTransactions();
  }, [navigate, token]);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description, amount, category, type }),
      });

      if (res.ok) {
        setDescription('');
        setAmount('');
        setCategory('');
        setType('');
        const newTransaction = await res.json();
        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
      } else {
        console.error('Failed to add transaction');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome! You are logged in.</p>
      <button onClick={handleLogout}>Logout</button>

      <h3>Add Transaction</h3>
      <form onSubmit={handleAddTransaction}>
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
        
        {/* Category Dropdown */}
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="Groceries">Groceries</option>
          <option value="Rent">Rent</option>
          <option value="Utilities">Utilities</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Salary">Salary</option>
          <option value="Other">Other</option>
        </select>

        {/* Type Dropdown */}
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        
        <button type="submit">Add</button>
      </form>

      <h3>Your Transactions</h3>
      <ul>
        {transactions.map((txn) => (
          <li key={txn._id}>
            {txn.description} - ${txn.amount} ({txn.category} - {txn.type})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
