import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/AuthService';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();  // Remove the token
    navigate('/login');  // Redirect to login page
  }, [navigate]);

  return null;
};

export default Logout;
