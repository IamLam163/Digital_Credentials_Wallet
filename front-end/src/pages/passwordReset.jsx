import React from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Passwordreset() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/forgot-password', {
        email
      });
      if (data.error) {
        toast.error(data.error)
      } else {
        setEmail({});
        toast.success('Password Reset successful');
        navigate('/');
      }
    } catch (error) {
      console.log((error.toString()));
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <input type='text' name='email' placeholder='enter your email'
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
