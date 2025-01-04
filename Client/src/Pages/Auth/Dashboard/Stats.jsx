import React from "react";
import { IoStatsChartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function Stats({ isActive, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        type="button"
        className={`flex items-center w-full p-2 text-base transition duration-75 rounded-lg group ${
          isActive
            ? "bg-[#F57C00] text-white"
            : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        }`}
        aria-controls="dropdown-example"
        data-collapse-toggle="dropdown-example"
      >
        <IoStatsChartSharp className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          Stats
        </span>
      </button>
      <Link to="/stats" className="sr-only">
        Go to Stats
      </Link>
    </div>
  );
}

export default Stats;
