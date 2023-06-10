import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  const logoutUser = async () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (!confirmed) return;


    try {
      await axios.get('/logout');
      // Clear local storage
      localStorage.clear();
      toast.success('Logged Out Successfully');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="logout-container">
      <h1 className="logout-header">Logout</h1>
      <button onClick={logoutUser} className="logout-button">
        Logout
      </button>
    </div>
  );
}
