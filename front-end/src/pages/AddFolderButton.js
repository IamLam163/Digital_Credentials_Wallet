import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormLabel, Input } from '@mui/material';
// import Mongoose from 'mongoose';

export default function AddFolderButton() {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setFolderName("")
    setOpen(false);
    // createFolder(folderName) in the
    // data base here

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
            <Button variant="contained" color="primary" onClick={handleClose} sx={{ fontSize: "12px"}}>
                Close
            </Button>
            <Button variant="outlined" color="primary" type="submit" sx={{ fontSize: "12px", marginTop: "5px"}} onClick={handleSubmit}>
                Add Folder
            </Button>
        </div>
      </Modal>
    </>
  );
}
