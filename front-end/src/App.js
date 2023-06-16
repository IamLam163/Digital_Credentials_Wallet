import './App.css';
import React from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Home from './pages';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/userContext';
import Dashboard from './pages/Dashboard';
import Passwordreset from './pages/passwordReset';
import Profile from './pages/Profile';
import About from './pages/Contact';
import NotFound from './pages/NotFound'
import Upload from './pages/Upload';

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
          <Route path='/profile' element={<Profile />} />
          <Route path='/forgot-password' element={<Passwordreset />} />
          <Route path='/about' element={<About />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
