import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })


  const registerUser = async (e) => {
    e.preventDefault()
    const { name, email, password } = data
    try {
      const { data } = await axios.post('/register', {
        name, email, password
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({})
        toast.success('Congratulations Signup successful!');
        navigate('/');
      }
    } catch (error) {
      console.log(error.toString());
    }
  }


  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input type='text' name='username'
          value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder='Enter your Name' />

        <label>Email</label>
        <input type='text' name='email'
          value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder='Enter your Email address' />

        <label>Password</label>
        <input type='text' name='password'
          value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder='Enter your password' />

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
