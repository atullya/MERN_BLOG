import React, { useEffect, useState } from "react";
import AdminSideBar from "../AdminComponent/AdminSideBar";
import axios from "axios";
import { BASE_URL } from "../../../App";

const UserDetail = () => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  const getAllUserDetail = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/getalluser`, {
        withCredentials: true,
      });
      setUsers(res.data.Users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUserDetail();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1 p-5 ml-64">
        {users && users.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg mr-[200px] overflow-hidden">
            <table className="min-w-full  leading-normal">
              <thead className="bg-[#1F1E48] text-white">
                <tr>
                  <th className="py-3 px-4 text-left">S.N</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Phone Number</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{user.username}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.phoneNumber}</td>
                    <td className="py-3 px-4">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsModalOpen(true);
                        }}
                      >
                        Message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500">No users found</div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">
                Message {selectedUser?.username}
              </h2>
              <textarea
                className="w-full p-2 border rounded mb-4"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
              ></textarea>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                  onClick={async () => {
                    try {
                      await axios.post(
                        `${BASE_URL}/api/v1/chat/${selectedUser._id}`,
                        { content: message },
                        { withCredentials: true }
                      );
                      alert("Message sent successfully!");
                      setIsModalOpen(false);
                      setMessage("");
                    } catch (error) {
                      console.error("Failed to send message", error);
                      alert("Failed to send message");
                    }
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
