import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css';
import { Button } from '@mantine/core';
import { BiImageAdd } from 'react-icons/bi';
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState(null);


  // useEffect(() => {
  //   const redirectTimer = setTimeout(() => {
  //     navigate('/files'); // Redirect to the login page after 5 seconds
  //   }, 1000);

  //   return () => clearTimeout(redirectTimer); // Cleanup the timer when the component unmounts
  // }, [navigate]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.get('/profile');
    const userId = data.id;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('owner', userId);

    try {
      const response = await axios.post('/cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      navigate('/files')
      // Handle success or redirect to another page
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <div className='outer'>
      <HiOutlineCloudUpload style={{ marginBottom: '30px', fontSize: '75px'}}/>
      <form onSubmit={handleSubmit}>
        <div className='inner'>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="name-input"
            style={{ height: '40px', borderRadius: '10px', border: '2px solid #ccc', marginLeft: '20px' }}
          />
        </div>
        <div className='upper'>
          <label>Image:</label>
          <Button
            variant='outline'
            component="label"
            style={{ marginLeft: '20px' }}
            className="file-input-button"
          >
            <BiImageAdd></BiImageAdd> Choose File
            <input type="file" style={{ display: 'none' }} onChange={handleImageChange} />
          </Button>
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
            </div>
          )}
        </div>
        <Button variant='outline' type="submit" className="upload-button">
          Upload
        </Button>
      </form>
    </div>
  );
};

export default Upload;