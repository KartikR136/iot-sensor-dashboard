import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const SensorChart = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="mb-6 text-xl font-semibold">
          Live Sensor Trends
        </h3>

        <div className="flex h-[400px] items-center justify-center text-slate-400">
          Waiting for sensor data...
        </div>
      </div>
    );
  }

  const labels = history.map((item) =>
    new Date(item.timestamp).toLocaleTimeString()
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: history.map((item) => item.temperature),
        tension: 0.35,
        borderWidth: 2
      },
      {
        label: "Humidity (%)",
        data: history.map((item) => item.humidity),
        tension: 0.35,
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff"
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#cbd5e1"
        },
        grid: {
          color: "#334155"
        }
      },
      y: {
        ticks: {
          color: "#cbd5e1"
        },
        grid: {
          color: "#334155"
        }
      }
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-6 text-xl font-semibold">
        Live Sensor Trends
      </h3>

      <div className="h-[400px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SensorChart;