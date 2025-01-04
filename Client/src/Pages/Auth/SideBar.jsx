import React from "react";

import NewPost from "./Dashboard/NewPost";
import Posts from "./Dashboard/Posts";
import Stats from "./Dashboard/Stats";
import Comments from "./Dashboard/Comments";
import { Link } from "react-router-dom";
import Users from "./Dashboard/Users";
import Logout from "./Dashboard/Logout";
function SideBar({ userdata }) {
  return (
    <div className="flex justify-center  gap-10">
      <aside
        id="sidebar-multi-level-sidebar"
        className="w-96 h-screen  "
        aria-label="Sidebar"
      >
        <div className="h-full px-5 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to={"/authhome"}>
                <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
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
            <NewPost />
            <Posts />
            <Stats />
            <Comments />

            <Users />
            <Logout />
          </ul>
        </div>
      </aside>
      <div className="mt-2 p-9 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
        asperiores nulla maiores fuga nam atque magnam totam labore nostrum
        facilis sequi vero delectus saepe mollitia minus dolorum cum molestiae
        consectetur unde voluptates nihil, sunt repellat fugiat. Quis
        asperiores, facere vero consectetur sed eveniet mollitia beatae ut cum
        adipisci provident illum dignissimos? Ex perferendis quos illo incidunt
        maxime repellat vero iste accusamus, aspernatur quam beatae natus
        necessitatibus possimus ab perspiciatis nulla ea illum consequatur sequi
        nisi, praesentium earum? Sunt quos id, earum sapiente nulla nihil
        deserunt cum eum voluptatibus possimus, esse non quam, architecto
        aperiam. Id eligendi debitis illum ullam earum?
      </div>
    </div>
  );
}

export default SideBar;
