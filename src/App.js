import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import FuelGraph from './components/FuelGraph';
import AnalysisResults from './components/AnalysisResults';
import FileUpload from './components/FileUpload';
import './App.css';
import initialFile from './data/data.csv';

const App = () => {
  const [fuelData, setFuelData] = useState([]);

  useEffect(() => {
    loadInitialFile();
  }, []);

  const loadInitialFile = () => {
    Papa.parse(initialFile, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        handleFileLoaded(results.data);
      },
    });
  };

  const handleFileLoaded = (data) => {
    const formattedData = data.map((entry) => ({
      gpsLedgerId: entry.gpsLedgerId,
      currentFuelLevel: entry.currentFuelLevel,
      isIgnitionOn: entry.isIgnitionOn,
      eventDate: new Date(entry.eventDate).getTime(),
      eventGeneratedTime: new Date(entry.eventGeneratedTime).getTime(),
    }));
    setFuelData(formattedData);
  };

  return (
    <div className="App">
      <h1>Fuel Data Analysis</h1>
      <div className="top-container">
        <div className="card">
          <FileUpload onFileLoaded={handleFileLoaded} />
        </div>
        <div className="card">
          {fuelData.length > 0 && <AnalysisResults fuelData={fuelData} />}
        </div>
      </div>
      {fuelData.length > 0 && <FuelGraph fuelData={fuelData} />}
    </div>
  );
};

export default App;
