import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function NewPost({ isActive, onClick }) {
  return (
    <div>
      <Link to={"/newpost"}>
        <li
          onClick={onClick} // Handle tab click to set the active tab
          className={`border-[#F57C00] shadow-lg border-2 flex items-center justify-center rounded-[20px] p-2 w-[170px] ${
            isActive
              ? "bg-[#F57C00] text-white"
              : "text-[#F57C00] hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <div className="flex items-center p-1 rounded-lg">
            <FaPlus className="w-5 h-5 text-[#F57C00]" />
            <span className="ms-3">NEW POST</span>
          </div>
        </li>
      </Link>
    </div>
  );
}

export default NewPost;
