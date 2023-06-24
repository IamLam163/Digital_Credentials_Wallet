import React, { useState, useEffect } from "react";
import axios from "axios";
import pic from "../images/svg-15.svg";
import { Button } from "@mantine/core";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Box, CircularProgress } from '@mui/material';

const Files = () => {
  const [cvList, setCvList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/profile");
        console.log(data);
        setCurrentUser(data);
        const response = await axios.get(`/user/cv/${data?.id}`);
        setCvList(response.data);
        setIsLoading(false);
        console.log(response.data);
        setCvList(response.data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh', padding: '2rem'}}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <div style={{ display: 'flex'}}>
        <a href="/upload">
          <Button variant="filled" sx={{ marginTop: "30px", width: "150px" }}>
            <AiOutlineCloudUpload size={70} />
            upload More
          </Button>
        </a>
        <a href="/dashboard">
          <Button
            variant="filled"
            style={{
              backgroundColor: "black",
              marginTop: "30px",
              marginLeft: "30px",
            }}
          >
            Home
          </Button>
        </a>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {cvList.length === 0 ? (
          <div style={{ alignItems: "center", marginTop: "150px" }}>
            <p>No Images found. Please upload images.</p>
            <a href="/upload">
              <Button
                variant="outlined"
                size="lg"
                sx={{
                  border: "1px solid gray",
                  color: "whitesmoke",
                  backgroundColor: "black",
                }}
              >
                Upload
              </Button>
            </a>
            <img
              src={pic}
              alt="Empty Database"
              style={{ width: "300px", height: "300px" }}
            />
          </div>
        ) : (
          cvList.map((cv) => (
            <div key={cv._id} style={{ alignItems : 'center'}}>
              <h4>{cv.name}</h4>
              <img
                src={cv.Image.secure_url}
                width={700}
                height={500}
                alt="CV"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: '50px',
                  padding : '0px 15px'
                }}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Files;
