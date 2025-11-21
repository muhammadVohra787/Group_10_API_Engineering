import React, { useState } from 'react';
import UserService from '../services/UserService';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/AuthService';
import './Register.css'; // Reuse the same styles as Register.css

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { username, password };

    try {
      const response = await UserService.loginUser(credentials);
      login(response.token); // Store the token
      navigate('/books'); // Redirect to the homepage or protected page
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="register-container">
      <nav className="navbar">
        <div className="navbar-brand">Book Inventory Management</div>
        <ul className="navbar-links">
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      <div className="form-wrapper">
        <h1>Login</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
