import React, { useState } from "react";
import axios from "axios";
import "./Upload.css";
import { Button } from "@mantine/core";
import { BiImageAdd } from "react-icons/bi";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [ uploadProgress, setUploadProgress ] = useState(0)
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.get("/profile");
    const userId = data.id;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("owner", userId);

    try {
      const response = await axios.post("/cv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      onUploadProgess : (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(progress);
        },
      });

      console.log(response.data);
      navigate("/Files");
      // Handle success or redirect to another page
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <div className="outer">
      <AiOutlineCloudUpload
        style={{ marginBottom: "30px", fontSize: "75px" }}
      />
      <form onSubmit={handleSubmit}>
        <div className="inner">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="name-input"
            style={{
              height: "40px",
              borderRadius: "10px",
              border: "2px solid #ccc",
              marginLeft: "20px",
            }}
          />
        </div>
        <div className="upper">
          <label>Image:</label>
          <Button
            variant="outline"
            component="label"
            style={{ marginLeft: "20px" }}
            className="file-input-button"
          >
            <BiImageAdd></BiImageAdd> 
            Choose File
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            {uploadProgress > 0 && (
        <Text
          style={{
            marginTop: '1rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: 'green',
            textAlign: 'center',
            height: '20px',
            width: '10px'
          }}
        >
          {uploadProgress}% uploaded
        </Text>
      )}
          </Button>
        </div>
        <Button variant="outline" type="submit" className="upload-button">
          Upload
        </Button>
      </form>
    </div>
  );
};

export default Upload;
