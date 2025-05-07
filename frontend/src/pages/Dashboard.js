import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Button.css';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/login" className="button-link">Log Out</Link>
    </div>
  );
};

export default Dashboard;
