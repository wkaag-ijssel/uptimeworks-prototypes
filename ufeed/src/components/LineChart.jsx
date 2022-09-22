import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      // position: 'top' as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const LineChart = (data) => {
  return (
    <div style={{ height: "250px" }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
