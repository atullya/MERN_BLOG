import React, { useState } from "react";
import Modal from "react-modal"; // Make sure to install react-modal: npm install react-modal
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../App";
Modal.setAppElement("#root"); // Ensure accessibility compliance

const EditPasswordModal = ({ isOpen, onClose, fetchProfile, userdata }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match!");
      return;
    }

    try {
      const payload = {
        oldPassword,
        newPassword,
      };
      setLoading(true);
      const res = await axios.patch(
        `${BASE_URL}/api/blog/changepassword`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        toast.success("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose();
        fetchProfile(); // Refresh user data if needed
      }
    } catch (error) {
      console.error("Error updating password:", error);

      // Handle backend error response
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Password Modal"
      className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Change Password
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            Old Password
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter old password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handlePasswordChange}
            disabled={loading}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditPasswordModal;
