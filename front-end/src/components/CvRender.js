import React from 'react';
import PdfViewer from './PdfViewer';
import { Button } from "@mantine/core";

function CvRender({ cvList, onDocumentLoadSuccess }) {
  return (
    <>
    <div>
        <a href="/dropzone">
          <Button
            variant="filled"
            style={{ backgroundColor: "black", marginTop: "30px" }}
          >
            Upload More
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
    <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          marginTop: "50px",
          marginLeft: "50px",
          justifyContent: "center",
        }}>
      {cvList &&
        cvList.length > 0 &&
        cvList.map((pdf) => (
          <div key={pdf._id}>
            <h3>{pdf.name}</h3>
            {pdf.file.mimetype === 'application/pdf' && pdf.file.downloadURL ? (
              <div style={{ width: 750, height: 500,  position: 'relative'}}>
                <PdfViewer url={pdf.file.downloadURL} style={{ width: '100%', height: '100%' }} />
                <a
                href={pdf.file.downloadURL}
                target="_blank"
                rel="noopener noreferrer"
                download={pdf.file.originalname}
                style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 1 }}
              >
                <Button variant="filled" color="primary" style={{ fontWeight: 'bold' }}>
                  Open PDF
                </Button>
              </a>
              </div>
            ) : (
              <img
                src={pdf.file.downloadURL}
                width={300}
                height={300}
                alt={pdf.file.originalname}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              />
            )}
          </div>
        ))}
    </div>
    </>
  );
}

export default CvRender;
