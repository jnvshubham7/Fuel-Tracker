// src/components/AverageFuelConsumptionGraph.js

import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AverageFuelConsumptionGraph = ({ averageFuelConsumption }) => {
  const chartRef = useRef(null);

  const data = {
    labels: averageFuelConsumption.map(entry => entry.hour),
    datasets: [
      {
        label: 'Average Fuel Consumption (liters/hour)',
        data: averageFuelConsumption.map(entry => entry.average),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hour of the Day',
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Average Fuel Consumption (liters/hour)',
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
    },
  };

  useEffect(() => {
    const chartInstance = chartRef.current;
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return <Bar ref={chartRef} data={data} options={options} />;
};

export default AverageFuelConsumptionGraph;
