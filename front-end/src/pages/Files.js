import React, { useState, useEffect } from "react";
import axios from "axios";
import pic from "../images/svg-15.svg";
import { Button } from "@mantine/core";
// import { AiOutlineCloudUpload } from 'react-icons/ai';

const Files = () => {
  const [cvList, setCvList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/profile");
        console.log(data);
        setCurrentUser(data);
        const response = await axios.get(`/user/cv/${data?.id}`);
        setCvList(response.data);
        setCvList(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this CV?')) {
    try {
      const response = await axios.delete(`/user/cv/${id}`);
      console.log('Response from server:', response.data);
      setCvList(cvList.filter((cv) => cv._id !== id));
    } catch (error) {
      console.error('Error while deleting CV:', error);
    }
  }
};

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      >
        <a href="/upload">
          <Button variant="outline" type="submit" className="upload-button">
            Upload More
          </Button>
        </a>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
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
            <div key={cv._id}>
              <a href={cv.Image.secure_url}>
                <p
                  style={{
                    color: "#829BE6",
                    fontSize: "20px",
                    textAlign: "center",
                    border: "1px solid #829BE6",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {cv.name}
                </p>
              </a>
              <img
                src={cv.Image.secure_url}
                width={300}
                height={300}
                alt="CV"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              />
              <div style={{ marginTop: '10px'}}>
              <Button variant='filled' onClick={() => handleDelete(cv._id)}>
                Delete
              </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Files;
