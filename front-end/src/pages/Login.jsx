import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  })


  const loginUser = (e) => {
    e.preventDefault()
    axios.get('')
  }
  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input type='text' name='email'
          value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder='Enter your Email address' />

        <label>Password</label>
        <input type='text' name='password'
          value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder='Enter your password' />

        <button type='submit'>Login</button>
      </form>
    </div>

  )
}
