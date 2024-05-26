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
    <div style={{ margin: '20px 0' }}>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="upload-file"
      />
      <button
        onClick={() => document.getElementById('upload-file').click()}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          display: 'inline-block',
        }}
      >
        Upload New CSV
      </button>
    </div>
  );
};

export default FileUpload;
