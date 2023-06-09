import './App.css';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContext, UserContextProvider } from './context/userContext';
import Dashboard from './pages/Dashboard';
import Passwordreset from './pages/passwordReset';
import Profile from './pages/Profile';
import About from './pages/Contact';
import NotFound from './pages/NotFound'
import Upload from './pages/Upload';
import Youverified from './pages/Verified';
import Verifyemail from './pages/VerifyUser';
import { PrivateRoute } from './Privateroutes';
import Files from './pages/Files';
import Mycv from './pages/Mycv';
import DropzoneButton from './pages/dropZone';

axios.defaults.baseURL = 'https://digital-wallet.onrender.com' || 'http://localhost:7000';
axios.defaults.withCredentials = true


function App() {
  //const { user } = useContext(UserContext);
  /*  const navigate = useNavigate();
  
    useEffect(() => {
      if (!user) {
        navigate('/login');
      }
    }, [user, navigate]);*/
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
          <Route path='/verified' element={<Youverified />} />
          <Route path='/verify-email/:userId' element={<Verifyemail />} />
          <Route path='/mycv' element={<Mycv />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/files' element={<Files />} />
          <Route path='/dropzone' element={<DropzoneButton />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
