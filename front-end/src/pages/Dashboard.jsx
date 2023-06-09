import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useState } from 'react'
// import Dashboard from '../Home/Dashboard';
import './Dashboard.css'

import {
    FaUserEdit,
  FaBars,
  FaFile,
  FaFolder
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi'
import { TiDocumentText } from 'react-icons/ti'
import { BiLogOutCircle } from 'react-icons/bi'
import ApiIcon from '@mui/icons-material/Api';
function Dashboard() {
    const { user } = useContext(UserContext)
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/profile",
            name:"Edit profile",
            icon:<FaUserEdit/>
        },
        {
            path:"/Folders",
            name:"Folders",
            icon:<FaFolder/>
        },
        {
            path:"/Files",
            name:"Files",
            icon:<FaFile/>
        },
        {
            path:"/My CVs",
            name:"My Cvs",
            icon:<TiDocumentText/>
        },
        {
            path:"/Setting",
            name:"Settings",
            icon:<FiSettings/>
        },
        {
          path:"/log out",
          name:"Log out",
          icon:<BiLogOutCircle/>
        }
    ]
  
  return (
    <>
    {!!user && (<p>Hi {user.name}!</p>)}
    <div className="container">
    <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
        <div className="top_section">
            <h1 style={{display: isOpen ? "block" : "none"}} className="logo"><ApiIcon sx={{ fontSize: 40 }} /></h1>
            <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                <FaBars onClick={toggle}/>
            </div>
        </div>
        {
            menuItem.map((item, index)=>(
                <NavLink to={item.path} key={index} className="link" activeclassName="active">
                    <div className="icon">{item.icon}</div>
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                </NavLink>
            )) 
        }
    </div>
 </div>
    </>
  )
}
export default Dashboard