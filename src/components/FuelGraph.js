import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(...registerables);
Chart.register(zoomPlugin);

const FuelGraph = ({ fuelData }) => {
  const chartRef = useRef(null);

  const data = {
    labels: fuelData.map(entry => new Date(entry.eventGeneratedTime)),
    datasets: [
      {
        label: 'Fuel Level',
        data: fuelData.map(entry => entry.currentFuelLevel),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'MMM d, yyyy, h:mm:ss a',
          unit: 'minute',
          displayFormats: {
            minute: 'MMM d, h:mm a',
          },
        },
        title: {
          display: true,
          text: 'Time',
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Fuel Level (liters)',
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
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          modifierKey: 'ctrl', // Require holding 'ctrl' key to pan
        },
        zoom: {
          wheel: {
            enabled: true,
            modifierKey: 'ctrl', // Require holding 'ctrl' key to zoom
          },
          drag: {
            enabled: true, // Enable drag zoom
          },
          pinch: {
            enabled: true, // Enable pinch zoom
          },
          mode: 'x',
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
