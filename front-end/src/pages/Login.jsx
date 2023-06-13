import './Login.css';
import React, {useState } from 'react';
//import { UserContext } from '../context/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import photo from '../images/svg-9.svg';

export default function Login() {
  //const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      const response = await axios.post('/login', { email, password });
      const { data } = response;
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ email: '', password: '' });
        toast.success('Login Successful');
        //loginUser(data);
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='ouline'>
    <img src={photo} alt="Logo" className="logo"/>
    <div className="signin-container">
      <h1 className="signin-header">Sign In</h1>
      <form onSubmit={handleSubmit} className="signin-form">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={data.email}
          onChange={handleInputChange}
          placeholder="Enter your Email address"
          className="signin-input"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          className="signin-input"
        />

        <button type="submit" className="signin-button">
          Login
        </button>
      </form>
    </div>
    </div>
  );
}

