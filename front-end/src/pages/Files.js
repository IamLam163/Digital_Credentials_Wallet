import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pic from '../images/svg-15.svg'
import { Button } from '@mantine/core';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const Files = () => {
  const [cvList, setCvList] = useState([]);
  const[currentUser,setCurrentUser] = useState(null);

  useEffect(() => {
    (
    async() => {
      try {
        const { data } = await axios.get('/profile');
        console.log(data)
        setCurrentUser(data);
        const response = await axios.get(`/user/cv/${data?.id}`);
        setCvList(response.data);
        console.log(response.data);
        setCvList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    )()
  }, []);

  return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      {cvList.length === 0 ? (
        <div style={{ alignItems: 'center', marginTop: '150px'}}>
        <p>No Images found. Please upload images.</p>
        <a href='/upload'>
        <Button variant='outlined' size="lg" sx={{ border: '1px solid gray', color: 'whitesmoke', backgroundColor: 'black' }}>Upload</Button>
        </a>
        <img 
        src={pic}
        alt="Empty Database"
        style={{ width: '300px', height: '300px' }}
        />
        </div>
      ) : (
        cvList.map((cv) => (
          <div key={cv._id}>
            <h3>{cv.name}</h3>
            <img
              src={cv.Image.secure_url}
              width={300}
              height={300}
              alt="CV"
              style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
            />
            <a href='/upload'>
            <AiOutlineCloudUpload size={70}/>
            upload More
            </a>
          </div>
        ))
      )}
    </div>

  );
};

export default Files;

