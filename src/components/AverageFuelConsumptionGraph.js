import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(...registerables, zoomPlugin);

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
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'MMM d, yyyy, h:mm:ss a',
          unit: 'hour',
          displayFormats: {
            hour: 'MMM d, h:mm a',
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
          modifierKey: 'ctrl',
        },
        zoom: {
          wheel: {
            enabled: true,
            modifierKey: 'ctrl',
          },
          drag: {
            enabled: true,
          },
          pinch: {
            enabled: true,
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

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default AverageFuelConsumptionGraph;
