const calculateAverageFuelConsumption = (data) => {
  const consumptionPerTimestamp = {};

  data.forEach((entry, index) => {
    if (index === 0) return; 

    const prevEntry = data[index - 1];
    const timeDiff = (new Date(entry.eventGeneratedTime) - new Date(prevEntry.eventGeneratedTime)) / (1000 * 60 * 60); 
    const fuelConsumed = prevEntry.currentFuelLevel - entry.currentFuelLevel;

    if (fuelConsumed > 0 && timeDiff > 0) { 
      const timestamp = new Date(entry.eventGeneratedTime).toISOString();
      if (!consumptionPerTimestamp[timestamp]) {
        consumptionPerTimestamp[timestamp] = { totalFuel: 0, count: 0 };
      }
      consumptionPerTimestamp[timestamp].totalFuel += fuelConsumed;
      consumptionPerTimestamp[timestamp].count += 1;
    }
  });

  const averageFuelConsumption = Object.keys(consumptionPerTimestamp).map(timestamp => ({
    timestamp,
    average: consumptionPerTimestamp[timestamp].totalFuel / consumptionPerTimestamp[timestamp].count,
  }));

  return averageFuelConsumption;
};

export default calculateAverageFuelConsumption;
