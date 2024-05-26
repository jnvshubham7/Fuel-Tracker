// src/App.js
import React, { useState } from 'react';
import FuelGraph from './components/FuelGraph';
import AnalysisResults from './components/AnalysisResults';
import FileUpload from './components/FileUpload';
import './App.css';

const App = () => {
  const [fuelData, setFuelData] = useState([]);

  const handleFileLoaded = (data) => {
    const formattedData = data.map(entry => ({
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
      <FileUpload onFileLoaded={handleFileLoaded} />
      {fuelData.length > 0 && <FuelGraph fuelData={fuelData} />}
      {fuelData.length > 0 && <AnalysisResults fuelData={fuelData} />}
    </div>
  );
};

export default App;
