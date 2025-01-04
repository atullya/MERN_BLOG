import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaCommentAlt, FaShareAlt } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../../App";

const BlogDetails = () => {
  const { id } = useParams(); // Get blog ID from URL parameters
  const [blog, setBlog] = useState(null); // State to store blog data
  const [likes, setLikes] = useState(0); // State for likes
  const [isLiked, setIsLiked] = useState(false); // Track if the blog is liked
  const [comments, setComments] = useState([]); // State for comments
  const [newComment, setNewComment] = useState(""); // State for new comment input

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/blog/inv/${id}`
        );
        console.log("Fetched blog details:", res.data);
        if (res.data) {
          setBlog(res.data);
          setLikes(res.data.likes || 0); // Initialize likes
          setComments(res.data.comments || []); // Initialize comments
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleLike = () => {
    // incrementLike()
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    // Optional: Send the like action to the server
    // axios.post(`/api/blog/like/${id}`);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
      // Optional: Send the comment to the server
      // axios.post(`/api/blog/comment/${id}`, { comment: newComment });
    }
  };

  if (!blog) {
    return <p className="text-center text-gray-600">Loading blog details...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Blog Image and Title */}
        <div className="relative">
          <img
            src={`${BASE_URL}${blog.images[0]}`} // Add the base URL for the backend server
            // Always include an alt text for accessibility
            alt={blog.title}
            className="w-full h-64 object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <h1 className="absolute bottom-4 left-4 text-3xl text-white font-bold">
            {blog.title}
          </h1>
        </div>

        {/* Blog Content */}
        <div className="p-6">
          <p className="text-gray-500 mb-4">
            By: <span className="font-medium">{blog.author.username}</span>
          </p>
          <p className="text-gray-800 text-lg leading-7">{blog.content}</p>
          <div className="mt-6">
            <span className="text-xs text-gray-500">
              Tags: {blog.tags.join(", ")}
            </span>
          </div>
        </div>

        {/* Like, Comment, and Share Section */}
        <div className="flex justify-between items-center border-t border-gray-200 p-4">
          <button
            className={`flex items-center space-x-2 ${
              isLiked ? "text-blue-500" : "text-gray-500"
            } hover:text-blue-600`}
            onClick={handleLike}
          >
            <FaThumbsUp />
            <span>{likes}</span>
          </button>

          <div className="flex items-center space-x-2 text-gray-500 hover:text-gray-600">
            <FaCommentAlt />
            <span>{comments.length}</span>
          </div>

          <button
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-600"
            onClick={() =>
              navigator.share({ title: blog.title, url: window.location.href })
            }
          >
            <FaShareAlt />
            <span>Share</span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <ul className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded-lg">
                  {comment}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </ul>

          {/* Add Comment */}
          <form className="mt-4 flex" onSubmit={handleCommentSubmit}>
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
