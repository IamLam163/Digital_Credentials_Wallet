import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useState, useEffect } from 'react'
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
import Folder from './Folder'
// import { BiSolidFolder } from 'react-icons/bi'
import { BsFolder } from 'react-icons/bs'

function Dashboard() {
    const { user: contextUser, setUser } = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const { folder, childFolder } = useFolder("6489b2187e46e11301c3eac3");
    console.log(folder);
    const [folders, setFolders] = useState([]);
    //fetch all folders
    useEffect(() => {
        (
            async () => {
                try {
                    const id = contextUser && contextUser.id
                    console.log({ id })
                    const { data } = await axios.get(`/folder/user/${id}`);
                    setFolders(data.folders);
                } catch (error) {
                    console.log(error);
                }
            }
        )()
    }, [])
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
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            {
                                folders && folders.map(childFolder => (
                                    <div key={childFolder.id} style={{ alignItems: 'center' }}>
                                        <BsFolder style={{ fontSize: '40' }} />
                                        {childFolder.name}
                                    </div>
                                ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
