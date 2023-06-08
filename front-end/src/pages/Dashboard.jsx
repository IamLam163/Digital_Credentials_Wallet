import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import ResponsiveAppBar from './sidebar'
export default function Dashboard() {
  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>Dashboard</h1>
      {/*<ResponsiveAppBar/>*/}
      {!!user && (<h2>Hi {user.name}!</h2>)}
    </div>
  )
}
