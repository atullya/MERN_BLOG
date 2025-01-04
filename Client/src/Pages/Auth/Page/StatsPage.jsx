import React from "react";
import Aside from "../Aside";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatsPage = () => {
  const pieData = {
    labels: ["Comment", "Likes", "Views", "Share", "No of Posts"],
    datasets: [
      {
        label: "Your Stats",
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverOffset: 10, // Adds spacing when hovered
        borderWidth: 2,
        borderColor: "#fff", // White borders for a cleaner look
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // Moves legend to the bottom
        labels: {
          color: "#333", // Darker legend text for better visibility
          font: {
            size: 14,
            family: "Roboto, sans-serif", // Custom font
          },
        },
      },
      tooltip: {
        backgroundColor: "#333", // Tooltip background color
        titleColor: "#fff", // Tooltip title color
        bodyColor: "#fff", // Tooltip body text color
        cornerRadius: 5,
      },
    },
  };

  return (
    <div className="flex cursor-pointer">
      <Aside />
      <div className="mt-2 ml-[250px] p-6 bg-gray-100 rounded-lg shadow-lg ">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Your Stats
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

export default StatsPage;
