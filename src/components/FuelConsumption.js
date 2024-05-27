import React from 'react';

const FuelConsumption = ({ fuelData }) => {
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
        totalDuration += (currentTimestamp - previousTimestamp) / (1000 * 60 * 60); 
      }

      previousLevel = currentLevel;
      previousTimestamp = currentTimestamp;
    }

    return totalFuelConsumed / totalDuration;
  };

  const averageFuelConsumption = calculateAverageFuelConsumption(fuelData);

  return (
    <div>
      <h2>Fuel Consumption Metrics</h2>
      <p>Average Fuel Consumption: {averageFuelConsumption.toFixed(2)} liters per hour</p>
    </div>
  );
};

export default FuelConsumption;
