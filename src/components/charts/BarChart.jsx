
import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, options, chartTitle, chartId = "barChart" }) => {
  const chartRef = useRef(null);

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'hsl(var(--foreground)/0.8)',
          font: {
            size: 14,
            family: "'Roboto', sans-serif"
          }
        }
      },
      title: {
        display: !!chartTitle,
        text: chartTitle,
        color: 'hsl(var(--foreground))',
        font: {
          size: 18,
          weight: 'bold',
          family: "'Montserrat', sans-serif"
        },
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'hsl(var(--card) / 0.8)',
        titleColor: 'hsl(var(--foreground))',
        bodyColor: 'hsl(var(--foreground)/0.9)',
        borderColor: 'hsl(var(--primary)/0.5)',
        borderWidth: 1,
        padding: 10,
      }
    },
    scales: {
      x: {
        grid: {
          color: 'hsl(var(--border)/0.1)',
          borderColor: 'hsl(var(--border)/0.3)'
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
           font: {
            size: 12,
            family: "'Open Sans', sans-serif"
          }
        }
      },
      y: {
        grid: {
          color: 'hsl(var(--border)/0.2)',
          borderColor: 'hsl(var(--border)/0.3)'
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            size: 12,
            family: "'Open Sans', sans-serif"
          }
        },
        beginAtZero: true
      }
    },
    elements: {
      bar: {
        borderRadius: 5,
        borderSkipped: 'bottom',
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };
  
  const mergedOptions = { ...defaultOptions, ...options };

  // Add gradient to datasets
  useEffect(() => {
    const chart = chartRef.current;
    if (chart && data.datasets) {
      data.datasets.forEach(dataset => {
        if (dataset.borderColor) {
          const canvas = chart.canvas;
          const ctx = canvas.getContext('2d');
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.7);
          
          let color1 = dataset.backgroundColor || dataset.borderColor; // Fallback
          let color2 = dataset.borderColor;

          // Simplified HSL string handling
          if (typeof color1 === 'string' && color1.startsWith('hsl')) {
            color1 = color1.replace(')', '/ 0.8)'); 
          } else if (typeof color1 === 'object' && color1.r !== undefined) { // Handle {r,g,b,a} object
             color1 = `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${color1.a !== undefined ? color1.a * 0.8 : 0.8})`;
          }

          if (typeof color2 === 'string' && color2.startsWith('hsl')) {
            color2 = color2.replace(')', '/ 0.4)');
          } else if (typeof color2 === 'object' && color2.r !== undefined) {
             color2 = `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${color2.a !== undefined ? color2.a * 0.4 : 0.4})`;
          }

          gradient.addColorStop(0, color1);
          gradient.addColorStop(1, color2);
          dataset.backgroundColor = gradient;
        }
      });
      chart.update();
    }
  }, [data]);


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-4 md:p-6 bg-card/70 rounded-xl shadow-lg glass-effect-dark h-[400px] md:h-[450px]"
    >
      <Bar ref={chartRef} data={data} options={mergedOptions} id={chartId}/>
    </motion.div>
  );
};

export default BarChart;
