import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Button.css';

const Login = () => {
  return (
    <div>
      <h2>Login Page</h2>
      <Link to="/register" className="button-link">Go to Register</Link>
    </div>
  );
};

export default Login;
