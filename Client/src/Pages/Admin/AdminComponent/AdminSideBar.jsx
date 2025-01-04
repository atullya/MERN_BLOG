import React from "react";
import { FaHome, FaUser, FaBlog, FaSignOutAlt, FaBars } from "react-icons/fa";
import logo1 from "../../../assets/logo1.jpg";
import { Link } from "react-router-dom";

const AdminSideBar = ({ isOpen, setIsOpen }) => {
  return (
    <div className="h-screen overflow-hidden">
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-[#1F1E48] text-white flex flex-col shadow-xl transition-all duration-300 h-[100vh]`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-purple-400">
          <h1
            className={`text-lg font-extrabold tracking-wide font-inter ${
              !isOpen && "hidden"
            } transition-all duration-300`}
          >
            <img
              src={logo1}
              alt="Logo"
              className="rounded-full" // Ensures the logo image is circular
              height={120}
              width={120}
            />
          </h1>

          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars size={26} />
          </button>
        </div>
        <nav className="flex-grow mt-6">
          <ul className="space-y-4">
            <li>
              <Link
                to={"/admin"}
                className="flex items-center px-4 py-3 bg-[#1F1E48] bg-opacity-25 rounded-lg hover:bg-opacity-50 transition-all duration-300"
              >
                <FaHome size={20} />
                <span
                  className={`ml-4 text-sm font-medium ${!isOpen && "hidden"}`}
                >
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={"/alluser"}
                className="flex items-center px-4 py-3 bg-[#1F1E48] bg-opacity-25 rounded-lg hover:bg-opacity-50 transition-all duration-300"
              >
                <FaUser size={20} />
                <span
                  className={`ml-4 text-sm font-medium ${!isOpen && "hidden"}`}
                >
                  User
                </span>
              </Link>
            </li>
            <Link to={"/allblogs"}>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 bg-[#1F1E48] bg-opacity-25 rounded-lg hover:bg-opacity-50 transition-all duration-300"
                >
                  <FaBlog size={20} />
                  <span
                    className={`ml-4 text-sm font-medium ${
                      !isOpen && "hidden"
                    }`}
                  >
                    Blog
                  </span>
                </a>
              </li>
            </Link>
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-3 bg-[#1F1E48] bg-opacity-25 rounded-lg hover:bg-opacity-50 transition-all duration-300"
              >
                <FaSignOutAlt size={20} />
                <span
                  className={`ml-4 text-sm font-medium ${!isOpen && "hidden"}`}
                >
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="px-4 py-4 border-t border-purple-400">
          <p
            className={`text-sm opacity-75 ${
              !isOpen && "hidden"
            } transition-opacity duration-300`}
          >
            © 2024 MyApp. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
