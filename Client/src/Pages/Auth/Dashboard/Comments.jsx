import React from "react";
import { FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";
const Comments = () => {
  return (
    <div>
      <Link to={"/viewblog"}>
        {" "}
        <li>
          <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FaComments
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75
          dark:text-gray-400 group-hover:text-gray-900
          dark:group-hover:text-white"
            />

            <span className="flex-1 ms-3 whitespace-nowrap">Read Blogs</span>
          </div>
        </li>
      </Link>
    </div>
  );
};

export default Comments;
