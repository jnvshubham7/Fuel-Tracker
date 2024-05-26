// src/components/FileUpload.js
import React from 'react';
import Papa from 'papaparse';

const FileUpload = ({ onFileLoaded }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          onFileLoaded(results.data);
        },
      });
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
