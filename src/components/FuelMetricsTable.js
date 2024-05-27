import React from 'react';

const FuelMetricsTable = ({ fuelData }) => {
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
        totalDuration += (currentTimestamp - previousTimestamp) / (1000 * 60 * 60); 
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
      <h2>Fuel Consumption Metrics</h2>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Fuel Filled</td>
            <td>{totalFuelFilled.toFixed(2)} liters</td>
          </tr>
          <tr>
            <td>Average Fuel Consumption</td>
            <td>{averageFuelConsumption.toFixed(2)} liters per hour</td>
          </tr>
          <tr>
            <td>Total Refueling Events</td>
            <td>{refuelingEvents.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FuelMetricsTable;
