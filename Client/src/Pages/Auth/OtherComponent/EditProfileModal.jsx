import React, { useState, useEffect } from "react";
import upload_area from "../../../assets/upload_area.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../App";
const EditProfileModal = ({
  isOpen,
  onClose,
  onSave,
  userdata,
  fetchProfile,
}) => {
  const [username, setUsername] = useState(userdata.username);
  const [email, setemail] = useState(userdata.email || "");
  const [image, setImage] = useState(null);

  // Handle file selection and cleanup memory
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  // API call to edit profile
  const editProfileInDatabase = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("image", image);

      const res = await axios.patch(`${BASE_URL}/api/blog/edit`, formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        // toast.success("Profile updated successfully!");
        toast.success("Profile updated successfully!");

        fetchProfile();
      }
      onSave(res.data); // Pass updated data to parent
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editProfileInDatabase();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="mb-4">
            <p>Upload Image</p>
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
            <label htmlFor="image" className="cursor-pointer">
              <img
                src={
                  image
                    ? URL.createObjectURL(image) // Preview uploaded image
                    : upload_area // Default image
                }
                className="w-24 h-24 object-cover rounded-full mx-auto"
                alt="Upload Preview"
              />
            </label>
          </div>

          {/* Username Input */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Phone Number Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-gray-400 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
        {/* <ToastContainer /> */}
      </div>
    </div>
  );
};

export default EditProfileModal;
