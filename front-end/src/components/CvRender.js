import React from 'react';
import PdfViewer from './PdfViewer';

function CvRender({ cvList, onDocumentLoadSuccess }) {
  return (
    <div>
      {cvList &&
        cvList.length > 0 &&
        cvList.map((pdf) => (
          <div key={pdf._id}>
            <h3>{pdf.name}</h3>
            {pdf.file.mimetype === 'application/pdf' && pdf.file.downloadURL ? (
              <div style={{ width: 500, height: 500 }}>
                <PdfViewer url={pdf.file.downloadURL} />
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
  );
}

export default CvRender;
