import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditPasswordModal from "./EditPasswordModal";
import { MdOutlineMessage } from "react-icons/md";
import MessageModal from "./MessageModal";
import { BASE_URL } from "../../../App";

const UserProfileComponent = () => {
  const [userdata, setUserdata] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); // Message modal state
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/blog/welcome`, {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 401) {
        navigate("/login");
      } else if (res.ok) {
        const data = await res.json();
        console.log(data);
        setUserdata(data.user);
      } else {
        console.error("Unexpected error:", res.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSaveProfile = (updatedData) => {
    console.log("Updated data: ", updatedData);
    setUserdata((prev) => ({
      ...prev,
      username: updatedData.username,
      phoneNumber: updatedData.phoneNumber,
    }));
    setIsProfileModalOpen(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!userdata) {
    return <div>Loading...</div>;
  }

  const handleSendMessage = () => {
    console.log("Message sent!");
    setIsMessageModalOpen(false); // Close the modal after sending the message
  };

  return (
    <div className="w-96 bg-white shadow-lg mr-[500px] rounded-lg overflow-hidden mx-auto">
      <div className="max-w-sm bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b"
            alt="Cover"
          />
        </div>
        <div className="w-32 h-32 mx-auto relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={`${BASE_URL}/uploads/${userdata.profilePic.split("\\").pop()}`}
            alt={userdata.username}
          />
        </div>
        <div className="text-center mt-4">
          <h2 className="font-semibold text-xl">{userdata.username}</h2>
          <p className="text-gray-500">{userdata.email || "N/A"}</p>
        </div>
        <ul className="py-4 text-gray-700 flex justify-around">
          <li className="flex flex-col items-center">
            <span>⭐</span>
            <span>{userdata.followers || 0}</span>
          </li>
          <li className="flex flex-col items-center">
            <span>👍</span>
            <span>{userdata.likes || 0}</span>
          </li>
          <li className="flex flex-col items-center">
            <FaEye />
            <span>{userdata.views || 0}</span>
          </li>
        </ul>
        <div className="border-t p-4 flex">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="w-1/2 mx-auto block rounded-full bg-gray-900 text-white font-semibold px-6 py-2 hover:bg-gray-700 transition duration-300"
          >
            Edit Profile
          </button>
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="w-1/2 mx-auto block rounded-full bg-gray-900 text-white font-semibold px-6 py-2 hover:bg-gray-700 transition duration-300"
          >
            Change Password
          </button>
        </div>
      </div>
      <EditProfileModal
        fetchProfile={fetchProfile}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={handleSaveProfile}
        userdata={userdata}
      />
      <EditPasswordModal
        fetchProfile={fetchProfile}
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        userdata={userdata}
      />
      <div
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1F1E48] text-white shadow-glow text-[30px] hover:scale-110 transition-transform duration-300 cursor-pointer fixed right-8 bottom-4"
        onClick={() => setIsMessageModalOpen(true)}
      >
        <MdOutlineMessage />
      </div>
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        onSend={handleSendMessage}
        userdata={userdata}
      />
      <ToastContainer />
    </div>
  );
};

export default UserProfileComponent;
