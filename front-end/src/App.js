import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Home from './pages';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/userContext';
import Dashboard from './pages/Dashboard';

axios.defaults.baseURL = 'http://localhost:7000';
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Toaster position='top-center' toastOptions={{ duration: 3000 }} />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
