// src/components/FuelGraph.js
import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-plugin-zoom';

Chart.register(...registerables);

const FuelGraph = ({ fuelData }) => {
  const chartRef = useRef(null);

  const data = {
    labels: fuelData.map(entry => new Date(entry.eventGeneratedTime)),
    datasets: [
      {
        label: 'Fuel Level',
        data: fuelData.map(entry => entry.currentFuelLevel),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          modifierKey: 'ctrl',  // Require holding 'ctrl' key to pan
        },
        zoom: {
          enabled: true,
          mode: 'x',
          modifierKey: 'ctrl',  // Require holding 'ctrl' key to zoom
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

  return <Line ref={chartRef} data={data} options={options} />;
};

export default FuelGraph;
