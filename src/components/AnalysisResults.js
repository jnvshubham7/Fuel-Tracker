import React from 'react';

const AnalysisResults = ({ fuelData }) => {
  const identifyRefuelingEvents = (data) => {
    const refuelingEvents = [];
    let previousLevel = data[0]?.currentFuelLevel || 0;

    for (let i = 1; i < data.length; i++) {
      const currentLevel = data[i].currentFuelLevel;
      if (currentLevel > previousLevel) {
        refuelingEvents.push({
          timestamp: data[i].eventGeneratedTime,
          fuelAdded: currentLevel - previousLevel,
        });
      }
      previousLevel = currentLevel;
    }

    return refuelingEvents;
  };

  const calculateTotalFuelFilled = (events) => {
    return events.reduce((total, event) => total + event.fuelAdded, 0);
  };

  const calculateAverageFuelConsumption = (data) => {
    let totalFuelConsumed = 0;
    let totalDuration = 0;
    let previousLevel = data[0]?.currentFuelLevel || 0;
    let previousTimestamp = data[0]?.eventGeneratedTime || 0;

    for (let i = 1; i < data.length; i++) {
      const currentLevel = data[i].currentFuelLevel;
      const currentTimestamp = data[i].eventGeneratedTime;

      if (currentLevel < previousLevel) {
        totalFuelConsumed += previousLevel - currentLevel;
        totalDuration += (currentTimestamp - previousTimestamp) / (1000 * 60 * 60); // convert ms to hours
      }

      previousLevel = currentLevel;
      previousTimestamp = currentTimestamp;
    }

    return totalFuelConsumed / totalDuration;
  };

  const refuelingEvents = identifyRefuelingEvents(fuelData);
  const totalFuelFilled = calculateTotalFuelFilled(refuelingEvents);
  const averageFuelConsumption = calculateAverageFuelConsumption(fuelData);

  

  return (
    <div>
      <h2>Analysis Results</h2>
      <p>Total Fuel Filled: {totalFuelFilled.toFixed(2)} liters</p>
      <p>Average Fuel Consumption: {averageFuelConsumption.toFixed(2)} liters per hour</p>
    </div>
  );
};

export default AnalysisResults;
