import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserChart = () => {
  const pieData = {
    labels: [
      "Total Users",
      "Active Users",
      "Inactive Users",
      "Subscribed Users",
      "Guest Users",
    ],
    datasets: [
      {
        label: "User Statistics",
        data: [200, 150, 30, 15, 5], // Static values for now
        backgroundColor: [
          "#36A2EB", // Blue for total users
          "#4BC0C0", // Teal for active users
          "#FFCE56", // Yellow for inactive users
          "#FF6384", // Red for subscribed users
          "#9966FF", // Purple for guest users
        ],
        hoverOffset: 10, // Adds spacing when hovered
        borderWidth: 2,
        borderColor: "#fff", // White borders for clarity
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // Legend at the bottom
        labels: {
          color: "#333", // Dark text
          font: {
            size: 14,
            family: "Roboto, sans-serif", // Consistent font style
          },
        },
      },
      tooltip: {
        backgroundColor: "#333", // Tooltip background
        titleColor: "#fff", // Title text color
        bodyColor: "#fff", // Body text color
        cornerRadius: 5, // Rounded tooltip corners
      },
    },
  };

  return (
    <div className="flex cursor-pointer">
      <div className="mt-2 ml-[250px] p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          User Statistics
        </h1>
        <div className="flex justify-center items-center">
          <div className="w-[350px] h-[350px] sm:w-[400px] sm:h-[400px]">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChart;
