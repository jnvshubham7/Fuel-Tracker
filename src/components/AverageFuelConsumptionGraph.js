import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AverageFuelConsumptionGraph = ({ averageFuelConsumption }) => {
  const chartRef = useRef(null);

  const data = {
    labels: averageFuelConsumption.map(entry => new Date(entry.timestamp)),
    datasets: [
      {
        label: 'Average Fuel Consumption (liters/hour)',
        data: averageFuelConsumption.map(entry => entry.average),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
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

export default AverageFuelConsumptionGraph;
