import { Button } from '@mantine/core';
import React from 'react';

function PdfViewer({ url }) {
  return (
    <>
    <object
      data={url}
      type="application/pdf"
      width="100%"
      height="100%"
      style={{display:'flex', flexWrap: 'wrap'}}
    >
      <p>Failed to load PDF file.</p>
    </object>
    </>
  );
}

export default PdfViewer;