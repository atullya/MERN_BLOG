import React, { useEffect, useState } from "react";
import background from "../../assets/background.svg";
import Social from "./Social";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../App";

const FullBlogPage = () => {
  const [blog, setBlog] = useState({});
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { indvdata } = location.state || {};

  const allBlog = async () => {
    if (!indvdata?._id) return;
    try {
      let res = await axios.get(`${BASE_URL}/api/guest/allblog/${indvdata._id}`);
      setBlog(res.data.blog.blog);
      console.log(res.data.blog);
      setAuthor(res.data.blog.author);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allBlog();
  }, []);

  if (!indvdata) {
    return (
      <p className="text-white text-center py-10">No blog data provided!</p>
    );
  }

  return (
    <div
      className="bg-cover bg-center min-h-screen w-full"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex flex-col items-center text-white px-4 py-8 md:px-8 lg:px-24">
        {/* Loading Skeleton */}
        {loading ? (
          <div className="w-full max-w-4xl animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-4"></div>
            <div className="h-20 bg-gray-300 rounded mb-4"></div>
          </div>
        ) : blog?.title ? (
          <>
            <h1 className="text-4xl font-bold mb-6 text-black text-center">
              {author.username || "Unknown Author"}
            </h1>
            <div className="w-full max-w-4xl bg-white text-gray-700 rounded-lg shadow-lg p-8 transition-transform transform hover:scale-[1.01]">
              <p className="text-gray-400 text-sm mb-4">{blog.date}</p>
              <h2 className="text-3xl font-semibold mb-6 text-black">
                {blog.title}
              </h2>
              <p className="leading-relaxed mb-6 text-gray-800">
                {blog.content}
              </p>
              <hr className="my-6 border-gray-300" />
              <div className="flex justify-between text-gray-500 text-sm">
                <p>
                  Last updated on{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(blog.updatedAt).toISOString().slice(0, 10)}
                  </span>
                </p>
                <p>{blog.comments?.length || 0} comments</p>
              </div>
              <Social />
            </div>
          </>
        ) : (
          <p className="text-center text-white text-lg">No blog found!</p>
        )}
      </div>

      {/* About Me Section */}
      <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center p-4">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-80 text-center">
          <div className="mb-4">
            <img
              className="rounded-full w-16 h-16 mx-auto"
              src={
                author?.profilePic
                  ? `http://localhost:4000/uploads/${author.profilePic
                      .split("\\")
                      .pop()}`
                  : "https://avatar.iran.liara.run/public/23" // Fallback image
              }
              alt={author?.username || "No Username"}
            />
            {/* <img
              src="https://via.placeholder.com/80"
              alt="Author"
              className="rounded-full mx-auto"
            /> */}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">About Me</h3>
          <p className="text-gray-600 mb-4">{author.username || ""}</p>
          <a
            href="#"
            className="text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            View my complete profile
          </a>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-80 text-center">
          <h3 className="text-xl font-semibold text-red-500 mb-2">
            Report Abuse
          </h3>
          <button className="mt-2 text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg transition-all">
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullBlogPage;
