const calculateAverageFuelConsumption = (data) => {
  const consumptionPerTimestamp = {};

  data.forEach((entry, index) => {
    if (index === 0) return; // Skip the first entry

    const prevEntry = data[index - 1];
    const timeDiff = (new Date(entry.eventGeneratedTime) - new Date(prevEntry.eventGeneratedTime)) / (1000 * 60 * 60); // time difference in hours
    const fuelConsumed = prevEntry.currentFuelLevel - entry.currentFuelLevel;

    if (fuelConsumed > 0 && timeDiff > 0) { // Only consider periods with fuel consumption and positive time difference
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
