// src/utils/calculateAverageFuelConsumption.js

const calculateAverageFuelConsumption = (fuelData) => {
    const hourlyConsumption = {};
  
    fuelData.forEach((entry, index) => {
      if (index === 0) return; // Skip the first entry
  
      const prevEntry = fuelData[index - 1];
  
      // Check if the ignition is off and there's a change in fuel level
      if (!entry.isIgnitionOn && entry.currentFuelLevel !== prevEntry.currentFuelLevel) {
        const hour = new Date(entry.eventGeneratedTime).getHours();
        const consumption = prevEntry.currentFuelLevel - entry.currentFuelLevel;
  
        if (!hourlyConsumption[hour]) {
          hourlyConsumption[hour] = {
            totalConsumption: 0,
            count: 0,
          };
        }
  
        hourlyConsumption[hour].totalConsumption += consumption;
        hourlyConsumption[hour].count += 1;
      }
    });
  
    // Calculate the average consumption per hour
    const averageConsumption = Object.keys(hourlyConsumption).map(hour => ({
      hour,
      average: hourlyConsumption[hour].totalConsumption / hourlyConsumption[hour].count,
    }));
  
    return averageConsumption;
  };
  
  export default calculateAverageFuelConsumption;
  