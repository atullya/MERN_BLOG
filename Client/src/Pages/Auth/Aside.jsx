import React, { useState } from "react";
import NewPost from "./Dashboard/NewPost";
import Posts from "./Dashboard/Posts";
import Stats from "./Dashboard/Stats";
import Comments from "./Dashboard/Comments";
import { Link } from "react-router-dom";
import Users from "./Dashboard/Users";
import Logout from "./Dashboard/Logout";

function Aside() {
  // Track the active tab
  const [activeTab, setActiveTab] = useState("");

  // Function to handle active tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-center gap-10">
      <aside
        id="sidebar-multi-level-sidebar"
        className="w-72 h-screen"
        aria-label="Sidebar"
      >
        <div className="h-full px-4 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {/* Dashboard */}
            <li>
              <Link to={"/authhome"}>
                <div
                  onClick={() => handleTabChange("Dashboard")}
                  className={`flex items-center p-2 rounded-lg ${
                    activeTab === "Dashboard"
                      ? "bg-[#F57C00] text-white"
                      : "text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </div>
              </Link>
            </li>

            {/* NewPost */}
            <NewPost
              isActive={activeTab === "NewPost"}
              onClick={() => handleTabChange("NewPost")}
            />

            {/* Posts */}
            <Posts
              isActive={activeTab === "Posts"}
              onClick={() => handleTabChange("Posts")}
            />

            {/* Stats */}
            <Link to={"/stats"}>
              <Stats
                isActive={activeTab === "Stats"}
                onClick={() => handleTabChange("Stats")}
              />
            </Link>

            {/* Comments */}
            <Comments
              isActive={activeTab === "Comments"}
              onClick={() => handleTabChange("Comments")}
            />

            {/* Users */}
            <Users
              isActive={activeTab === "Users"}
              onClick={() => handleTabChange("Users")}
            />

            {/* Logout */}
            <Logout
              isActive={activeTab === "Logout"}
              onClick={() => handleTabChange("Logout")}
            />
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Aside;
