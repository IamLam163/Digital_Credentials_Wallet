import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Button } from '@mantine/core';
//import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Document, Page, pdfjs } from 'react-pdf';
//import pic from '../images/svg-15.svg';
import CvRender from '../components/CvRender';
//import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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

  return (
    <div style={{ display: 'flex', flewWrap: 'wrap' }}>
      <CvRender cvList={cvList} onDocumentLoadSuccess={onDocumentLoadSuccess} />
    </div>
  )
};

export default Mycv;

