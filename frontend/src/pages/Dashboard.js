import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchTransactions = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/transactions', { // Corrected to port 3000
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log("Fetched transactions:", data); // Debugging: check fetched data
          setTransactions(data);
        } else {
          console.error('Failed to fetch transactions');
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchTransactions();
  }, [token, navigate]);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/transactions', { // Corrected to port 3000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description, amount }),
      });

      if (res.ok) {
        const newTransaction = await res.json();
        console.log("Newly added transaction:", newTransaction); // Debugging: check new transaction
        setDescription('');
        setAmount('');
        
        // Add the new transaction to the state so it shows up immediately
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
        <button type="submit">Add</button>
      </form>

      <h3>Your Transactions</h3>
      <ul>
        {transactions.map((txn) => (
          <li key={txn._id}>
            {txn.description} - ${txn.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
