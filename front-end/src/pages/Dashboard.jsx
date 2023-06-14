import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import {
    FaUserEdit,
    FaBars,
    FaFile,
    FaFolder
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi'
import { TiDocumentText } from 'react-icons/ti'
import { BiLogOutCircle } from 'react-icons/bi'
import ApiIcon from '@mui/icons-material/Api';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion';
import { FaQuestionCircle } from 'react-icons/fa'
import AddFolderButton from './AddFolderButton'
import { useFolder } from '../components/hooks/useFolder'


function Dashboard() {
    const { user: contextUser, setUser } = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const { folder } = useFolder("64815feaace945dc613fbf7b");
    console.log(folder);

    const handleLogout = async () => {
        const confirmed = window.confirm('Are you sure you want to logout?');
        if (!confirmed) return;
        await axios.get('/logout');
        localStorage.clear();
        setUser(null);
        toast.success('Logged Out Successfully');
        navigate('/login');
    }

    const menuItem = [
        {
            path: "/profile",
            name: "Edit profile",
            icon: <FaUserEdit />
        },
        {
            path: "/Folders",
            name: "Folders",
            icon: <FaFolder />
        },
        {
            path: "/Files",
            name: "Files",
            icon: <FaFile />
        },
        {
            path: "/My CVs",
            name: "My Cvs",
            icon: <TiDocumentText />
        },
        {
            path: "/Setting",
            name: "Settings",
            icon: <FiSettings />
        },
        {
            path: "/about",
            name: "FAQ",
            icon: <FaQuestionCircle />

        },
        {
            path: "/logout",
            name: "Log out",
            icon: <BiLogOutCircle />,
            onClick: handleLogout
        }
    ]

    return (
        <>
            {!!contextUser && (<p>Welcome back {contextUser.name}!</p>)}
            <div className="container">
                <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                    <div className="top_section">
                        <h1 style={{ display: isOpen ? "block" : "none" }}><ApiIcon sx={{ fontSize: 40 }} /></h1>
                        <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                            <FaBars onClick={toggle} />
                        </div>
                    </div>
                    {
                        menuItem.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.1 }}
                            >
                                <NavLink to={item.path}
                                    key={index} className="link"
                                    activeClassName="active"
                                    onClick={item.onClick}
                                >
                                    <div className="icon">{item.icon}</div>
                                    <div style={{ display: isOpen ? "block" : "none" }}
                                        className="link_text">
                                        {item.name}
                                    </div>
                                </NavLink>
                            </motion.div>
                        ))}
                </div>
                <div className='middle'>
                    <div className='buttonF'>
                        <AddFolderButton currentFolder={folder} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
