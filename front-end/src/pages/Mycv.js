import React, { useState, useEffect } from "react";
import axios from "axios";
//import { Button } from '@mantine/core';
//import { AiOutlineCloudUpload } from 'react-icons/ai';
import { pdfjs } from "react-pdf";
// import { Document, Page, pdfjs } from "react-pdf";
//import pic from '../images/svg-15.svg';
import CvRender from "../components/CvRender";
// import { Button } from '@mantine/core';
import Sidebar from "./Sidebar";
//import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Mycv = () => {
  const [setCurrentUser] = useState(null);
  // const [currentUser, setCurrentUser] = useState(null);
  const [cvList, setCvList] = useState(null);
  const [setNumPages] = useState(null);
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/profile");
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
    <div
      style={{ display: "flex", justifyContent: "center", alignItes: "center" }}
    >
      <div style={{ display: "flex" }}>
        <Sidebar />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <CvRender
          cvList={cvList}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
        />
      </div>
    </div>
  );
};

export default Mycv;
