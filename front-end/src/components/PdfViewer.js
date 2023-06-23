import { Button } from '@mantine/core';
import React from 'react';

function PdfViewer({ url }) {
  const sharePdf = () => {
    const shareUrl = `https://example.com/share?pdf=${encodeURIComponent(url)}`;

    window.open(shareUrl, '_blank');
    
  }
  const handlePdfError = () => {
    const errorMessage = document.getElementById('pdf-error');
    errorMessage.style.display = 'block';
  };

  return (
    <div style={{ width: '100%', height: '100%', border: '1px solid #ccc', position: 'relative' }}>
      <embed
        src={url}
        type="application/pdf"
        style={{ width: '100%', height: '100%', display: 'block' }}
        onError={handlePdfError}
      />
      <div
        id="pdf-error"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#f44336',
          padding: '10px',
          borderRadius: '4px',
          color: '#fff',
          display: 'none',
          zIndex: 1,
        }}
      >
        <span>Failed to load PDF file.</span>
        
      </div>
      <Button variant="contained" color="primary" style={{ fontWeight: 'bold' }} onClick={sharePdf}> Share PDF </Button>
    </div>
  );
}

export default PdfViewer;