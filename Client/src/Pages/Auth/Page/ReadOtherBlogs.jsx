import React, { useEffect, useState } from "react";
import Aside from "../Aside";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../App";

const ReadOtherBlogs = () => {
  const [blogs, setBlogs] = useState([]); // State to store combined blog and author data
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/blog/viewavailableblog`,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        const { Blogs, Authors } = res.data;
        // Map blogs to their respective authors
        const combinedData = Blogs.map((blog) => {
          const author = Authors.find((auth) => auth.blogId === blog._id);
          return { ...blog, authorName: author?.userName || "Unknown" };
        });
        setBlogs(combinedData);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Aside />

      {/* Main Content */}
      <div className="w-full">
        {/* Header Section */}
        <div className="text-center py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
          <h1 className="text-5xl font-extrabold">Available Blogs</h1>
          <p className="mt-4 text-lg">
            Discover the latest articles and insights
          </p>
        </div>

        {/* Blog Cards Section */}
        <div className="py-8 px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="overflow-hidden border border-gray-200 shadow-md rounded-lg bg-white hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  {/* Image Section */}
                  <div className="relative">
                    <img
                      src={`${BASE_URL}${blog.images[0]}`} // Add the base URL for the backend server
                      // Always include an alt text for accessibility
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                    <h2 className="absolute bottom-4 left-4 text-lg font-semibold text-white">
                      {blog.title}
                    </h2>
                  </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-2">
                      By: <span className="font-medium">{blog.authorName}</span>
                    </p>
                    <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                      {blog.content}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        Tags: {blog.tags.join(", ")}
                      </span>
                      <button
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-full hover:from-blue-600 hover:to-purple-600 transition-colors"
                        onClick={() => navigate(`/blogs/${blog._id}`)}
                      >
                        Read More
                      </button>
                      ;
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No blogs available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadOtherBlogs;
