import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Button.css';

const Register = () => {
  return (
    <div>
      <h2>Register Page</h2>
      <Link to="/login" className="button-link">Go to Login</Link>
    </div>
  );
};

export default Register;
