import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormLabel, Input } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../context/userContext';
// import Mongoose from 'mongoose';

export default function AddFolderButton() {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  //const [user, setUser] = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setFolderName("")
    //setOpen(false);
    // createFolder(folderName) in the data base here
    //const { name } = data;
    try {
      console.log({ user })
      const response = await axios.post('/folder/add', { name: folderName });
      const { data } = response
      console.log('Folder created Successfully:', data.folder);
      setFolderName('');
      setOpen(false);
    } catch (error) {
      console.log(error);
    }

  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" size="small">
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            outline: 'none',
          }}
        >
          <form onSubmit={handleSubmit}>
            <FormControl onSubmit={handleSubmit}>
              <FormLabel>Folder Name</FormLabel>
              <Input
                type="text"
                required
                value={folderName}
                onChange={handleFolderNameChange}
                placeholder="Enter Folder Name"
              />
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleClose} sx={{ fontSize: "12px" }}>
              Close
            </Button>
            <Button variant="outlined" color="primary" type="submit" sx={{ fontSize: "12px", marginTop: "5px" }} onClick={handleSubmit}>
              Add Folder
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
}
