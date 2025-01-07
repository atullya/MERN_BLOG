import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogout = ({ isOpen }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const confirmLogout = () => {
    setShowModal(true);
  };

  const cancelLogout = () => {
    setShowModal(false);
    toast.info("Logout canceled");
  };

  const LogoutUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/logout`);
      const result = res.data;

      if (res.status === 200 && result.message === "Logged out successfully") {
        toast.success(result.message);
        navigate("/");
      } else {
        toast.error("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout. Please try again later.");
    }
  };

  return (
    <div>
      <li>
        <a
          href="#"
          className="flex items-center px-4 py-3 bg-[#1F1E48] bg-opacity-25 rounded-lg hover:bg-opacity-50 transition-all duration-300"
          onClick={confirmLogout}
        >
          <FaSignOutAlt size={20} />
          <span className={`ml-4 text-sm font-medium ${!isOpen && "hidden"}`}>
            Logout
          </span>
        </a>
      </li>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Confirm Logout
            </h2>
            <p className="text-gray-700">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={cancelLogout}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={LogoutUser}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AdminLogout;
