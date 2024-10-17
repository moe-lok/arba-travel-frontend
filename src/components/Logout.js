import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('logout/');
      // Clear all items from localStorage
      localStorage.clear();
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if the server request fails, we should still clear local storage and redirect
      localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;