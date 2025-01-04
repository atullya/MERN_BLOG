import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../App";

const MessageModal = ({ isOpen, onClose, userdata }) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages from API
  useEffect(() => {
    let isMounted = true; // Cleanup flag

    const fetchMessages = async () => {
      try {
        console.log(userdata._id);
        const response = await axios.get(
          `${BASE_URL}/api/v1/chat/676ac02357c5fee58bf274c8`,
          { withCredentials: true }
        );

        if (isMounted) {
          console.log(response.data);
          const allMessages = response.data; // Assuming response.data is an array of messages
          setMessages(allMessages);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();

    return () => {
      isMounted = false; // Cleanup
    };
  }, [userdata._id]); // Added dependency on userdata._id

  const handleSend = () => {
    if (newMessage.trim()) {
      // You should also send the new message to the API here
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), senderId: userdata._id, content: newMessage },
      ]);
      setNewMessage(""); // Clear the input
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white w-96 rounded-lg shadow-lg flex flex-col h-[80%]">
        <div className="bg-[#1F1E48] text-white px-4 py-2 rounded-t-lg text-lg font-bold">
          Messenger
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.senderId === userdata._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.senderId === userdata._id
                      ? "bg-[#1F1E48] text-white"
                      : "bg-gray-200 text-gray-800"
                  } max-w-xs px-4 py-2 rounded-lg`}
                >
                  {message.content}
                </div>
              </div>
            ))
          ) : (
            <p>No messages</p>
          )}
        </div>

        <div className="p-4 border-t flex items-center gap-2">
          <textarea
            className="flex-1 border rounded-lg p-2"
            rows="1"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button
            onClick={handleSend}
            className="bg-[#1F1E48] text-white px-4 py-2 rounded-lg hover:bg-[#33336b]"
          >
            Send
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
