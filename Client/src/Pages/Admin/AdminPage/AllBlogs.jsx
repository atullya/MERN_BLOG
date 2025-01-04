import React, { useEffect, useState } from "react";
import AdminSideBar from "../AdminComponent/AdminSideBar";
import axios from "axios";
import { BASE_URL } from "../../../App";

const AllBlogs = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [blogs, setBlogs] = useState([]);

  // Fetch all posts
  const fetchAllPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/getalluser`, {
        withCredentials: true,
      });
      console.log("API Response:", res.data); // Debugging API response
      setBlogs(res.data); // Update state
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    console.log("Blogs state updated:", blogs); // Debugging state
  }, [blogs]);

  return (
    <div className="flex">
      <AdminSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div>
        {/* Render data if available */}
        {blogs && blogs.length > 0 ? (
          blogs.map((item) => (
            <div key={item._id} className="blog-card">
              <h3>{item.username}</h3>
              <p>Email: {item.email}</p>
              <p>Phone: {item.phoneNumber}</p>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
