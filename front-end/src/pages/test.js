import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

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
      // Handle success or redirect to another page
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Upload CV</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};