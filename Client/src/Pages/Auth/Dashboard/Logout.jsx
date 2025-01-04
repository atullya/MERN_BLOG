import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../App";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const navigate = useNavigate();
  const confirmLogout = () => {
    setShowModal(true); // Show confirmation modal
  };

  const cancelLogout = () => {
    setShowModal(false); // Close the modal

    toast.info("Logout canceled");
  };
  const LogoutUser = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/api/auth/logout`);
      let result = res.data;
      console.log(result);
      if (res.status === 200 && result.message === "Logged out successfully") {
        toast.success(result.message); // Optional: Display a success toast
        navigate("/"); // Redirect to the home page
      } else {
        console.log("Unexpected response: ", result);
        toast.error("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Logout error: ", error);
      toast.error("An error occurred during logout. Please try again later.");
    }
  }; 
  return (
    <div>
      {" "}
      <li>
        <a
          href="#"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
            />
          </svg>
          {/* <button className="flex-1 ms-3 whitespace-nowrap">Log Out</button> */}
          <span
            className="flex-1 ms-3 whitespace-nowrap"
            onClick={() => confirmLogout()}
          >
            Log Out
          </span>
        </a>
      </li>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p>Are you sure you want to Logout?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={cancelLogout}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={LogoutUser}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
