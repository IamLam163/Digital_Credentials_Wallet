import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pic from '../images/svg-15.svg';
import { Button } from '@mantine/core';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Document, Page } from 'react-pdf';

const Mycv = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cvList, setCvList] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/profile');
        setCurrentUser(data);
        const response = await axios.get(`/user/pdf/${data?.id}`);
        setCvList(response.data.pdf);
        console.log(response.data.pdf);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // ...

return (
  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
    {cvList && cvList.length > 0 ? (
      cvList.map((pdf) => (
        <div key={pdf._id}>
          <h3>{pdf.name}</h3>
          {pdf.file.mimetype === 'application/pdf' && pdf.file.downloadURL ? (
            <div style={{ width: 500, height: 500 }}>
              <Document file={pdf.file.downloadURL} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} width={500} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </div>
          ) : pdf.file.downloadURL ? (
            <img
              src={pdf.file.downloadURL}
              width={300}
              height={300}
              alt="Image"
              style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
            />
          ) : (
            <p>Download URL not available</p>
          )}
        </div>
      ))
    ) : (
      <div style={{ alignItems: 'center', marginTop: '150px' }}>
        <p>No Images found. Please upload images.</p>
        <img src={pic} alt="Empty Database" style={{ width: '300px', height: '300px' }} />
      </div>
    )}
    <div>
      <a href="/upload">
        <Button
          variant="outlined"
          size="lg"
          sx={{
            border: '1px solid gray',
            color: 'whitesmoke',
            backgroundColor: 'black',
            flexWrap: 'wrap',
          }}
        >
          Upload More
          <AiOutlineCloudUpload size={20} sx={{ marginRight: '10px' }} />
        </Button>
      </a>
    </div>
  </div>
);

};

export default Mycv;
