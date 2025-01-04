import React from "react";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";

function Posts({ isActive, onClick }) {
  return (
    <div>
      <Link to={"/posts"}>
        <li>
          <button
            onClick={onClick} // Handle tab click to set the active tab
            type="button"
            className={`flex items-center w-full p-2 text-base transition duration-75 rounded-lg group ${
              isActive
                ? "bg-[#F57C00] text-white"
                : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            }`}
            aria-controls="dropdown-example"
            data-collapse-toggle="dropdown-example"
          >
            <FaBook className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
              Posts
            </span>
          </button>
        </li>
      </Link>
    </div>
  );
}

export default Posts;
