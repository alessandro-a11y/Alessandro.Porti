
import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ data, options, chartTitle, chartId = "lineChart" }) => {
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
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('pt-BR').format(context.parsed.y);
            }
            return label;
          }
        }
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
          },
          callback: function(value) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
        },
        beginAtZero: true
      }
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3,
      },
      point: {
        radius: 5,
        hoverRadius: 8,
        borderWidth: 2,
        hoverBorderWidth: 3
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };
  
  useEffect(() => {
    const chart = chartRef.current;
    if (chart && data.datasets) {
      data.datasets.forEach((dataset) => {
        if (dataset.borderColor) {
          const canvas = chart.canvas;
          const ctx = canvas.getContext('2d');
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
          
          let colorStart = 'rgba(138, 43, 226, 0.8)'; // Default purple start
          let colorEnd = 'rgba(138, 43, 226, 0.1)'; // Default purple end

          // Try to parse borderColor
          if (typeof dataset.borderColor === 'string' && dataset.borderColor.startsWith('hsl')) {
            try {
              // Simplified HSL parsing - assumes format like 'hsl(H S% L% / A)' or 'hsl(H S% L%)'
              const match = dataset.borderColor.match(/hsl\(\s*(\d+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+)\s*|\/\s*([\d.]+)\s*)?\)/i);
              if (match) {
                const h = match[1];
                const s = match[2];
                const l = match[3];
                const aBorder = match[4] || match[5] || 1; // Alpha for border color
                
                colorStart = `hsla(${h}, ${s}%, ${l}%, ${parseFloat(aBorder) * 0.8})`;
                colorEnd = `hsla(${h}, ${s}%, ${l}%, ${parseFloat(aBorder) * 0.1})`;
              } else {
                 // Fallback if HSL parsing fails but it starts with hsl
                 colorStart = dataset.borderColor; // Use original color
                 colorEnd = dataset.borderColor.replace(/(\d+)\)$/, (parseFloat(RegExp.$1) * 0.1) +')').replace('hsl(','hsla('); // Attempt to make it transparent
                 if (!colorEnd.includes('hsla')) colorEnd = 'rgba(138, 43, 226, 0.1)'; // Final fallback for end
              }
            } catch (e) {
              // If parsing fails, stick to defaults
            }
          } else if (typeof dataset.borderColor === 'string') { // If it's already a valid color string (e.g., hex, rgba)
            colorStart = dataset.borderColor;
            // Try to make a transparent version for colorEnd, very simplistic
            if (dataset.borderColor.startsWith('#') && dataset.borderColor.length === 7) {
              colorEnd = dataset.borderColor + '1A'; // Add 10% alpha hex
            } else if (dataset.borderColor.startsWith('rgb(')) {
              colorEnd = dataset.borderColor.replace('rgb(', 'rgba(').replace(')', ', 0.1)');
            } else if (dataset.borderColor.startsWith('rgba(')) {
               colorEnd = dataset.borderColor.replace(/,([\d.]+)\)/, `, ${parseFloat(RegExp.$1)*0.1})`);
            }
          }

          gradient.addColorStop(0, colorStart); 
          gradient.addColorStop(1, colorEnd);
          
          dataset.backgroundColor = gradient;
        }
      });
      chart.update();
    }
  }, [data, chartRef]);


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-4 md:p-6 bg-card/70 rounded-xl shadow-lg glass-effect-dark h-[400px] md:h-[450px]"
    >
      <Line ref={chartRef} data={data} options={mergedOptions} id={chartId} />
    </motion.div>
  );
};

export default LineChart;
