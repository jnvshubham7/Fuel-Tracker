import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import FuelGraph from './components/FuelGraph';
import FileUpload from './components/FileUpload';
import './App.css';
import initialFile from './data/data.csv';
import FuelMetricsTable from './components/FuelMetricsTable';
import calculateAverageFuelConsumption from './utils/calculateAverageFuelConsumption';
import AverageFuelConsumptionGraph from './components/AverageFuelConsumptionGraph';


const App = () => {
  const [fuelData, setFuelData] = useState([]);
  const [averageFuelConsumptionData, setAverageFuelConsumptionData] = useState([]);

  useEffect(() => {
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

    loadInitialFile();
  }, []);

  const handleFileLoaded = (data) => {
    const formattedData = data.map((entry) => ({
      gpsLedgerId: entry.gpsLedgerId,
      currentFuelLevel: entry.currentFuelLevel,
      isIgnitionOn: entry.isIgnitionOn,
      eventDate: new Date(entry.eventDate).getTime(),
      eventGeneratedTime: new Date(entry.eventGeneratedTime).getTime(),
    }));
    setFuelData(formattedData);
    setAverageFuelConsumptionData(calculateAverageFuelConsumption(formattedData));
  };

  return (
    <div className="App">
      <h1>Fuel Data Analysis</h1>
      <div className="top-container">
        <div className="card">
          <FileUpload onFileLoaded={handleFileLoaded} />
        </div>
        <div className="card">
          {fuelData.length > 0 && <FuelMetricsTable fuelData={fuelData} />}
        </div>
      </div>
      <div className="card graph-card">
        {fuelData.length > 0 && <FuelGraph fuelData={fuelData} />}
      </div>
      <div className="card graph-card">
        {averageFuelConsumptionData.length > 0 && <AverageFuelConsumptionGraph averageFuelConsumption={averageFuelConsumptionData} />}
      </div>
    </div>
  );
};

export default App;
