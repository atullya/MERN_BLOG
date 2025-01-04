import React, { useEffect, useState } from "react";
import Aside from "../Aside";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserCircle, FaShare, FaTrash } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { BASE_URL } from "../../../App";

function AllUserPost() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [deleteId, setDeleteId] = useState(null); // ID of the post to be deleted

  const fetchAllPost = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/api/blog/uploadedblog`, {
        withCredentials: true,
      });
      if (res.data) {
        console.log(res.data.posts);
        setPosts(res.data.posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const deleteBlog = async () => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/blog/remove/${deleteId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        toast.success("Post Deleted Successfully");
        fetchAllPost();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred";
      toast.error(`Error deleting posts: ${errorMessage}`);
    } finally {
      setShowModal(false); // Close modal after action
      setDeleteId(null); // Clear the delete ID
    }
  };

  useEffect(() => {
    fetchAllPost();
  }, []);

  const confirmDelete = (id) => {
    setDeleteId(id); // Store the post ID to delete
    setShowModal(true); // Show confirmation modal
  };

  const cancelDelete = () => {
    setShowModal(false); // Close the modal
    setDeleteId(null); // Clear the ID
    toast.info("Deletion canceled");
  };

  return (
    <div className="flex cursor-pointer">
      <ToastContainer />
      <Aside />
      <div className="w-full mr-10">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={index}
              className="border-2 border-gray-700 rounded-[5px] mt-16 p-6 flex justify-between group"
            >
              <div className="flex gap-2">
                {post.images && post.images[0] ? (
                  <img
                    src={`http://localhost:4000${post.images[0]}`} // Add the base URL for the backend server
                    alt="Post Image" // Always include an alt text for accessibility
                    className="h-20 w-30" // Adjust styling as necessary
                  />
                ) : (
                  "No Image Found"
                )}
                <div>
                  <h3
                    style={{ fontFamily: "'Roboto Flex', serif" }}
                    className="text-2xl"
                  >
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-center gap-[20px]">
                    <h3 className="font-mono">
                      {new Date(post.createdAt).toISOString().slice(0, 10)}
                    </h3>
                    <h3 className="border-2 rounded-[10px] p-2 border-gray-500">
                      {post.category}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-[20px] group">
                  <h2 className="text-2xl">Atullya</h2>
                  <FaTrash
                    className="hidden group-hover:block cursor-pointer"
                    onClick={() => confirmDelete(post._id)}
                  />
                  <FaUserCircle className="text-2xl group-hover:hidden" />
                </div>
                <div className="flex gap-6 items-center text-[#90A4AE]">
                  <FaShare className="text-2xl" />
                  <div className="flex gap-3">
                    <p className="text-black">0</p>
                    <MdModeComment className="text-2xl text-black" />
                  </div>
                  <div className="flex gap-3">
                    <p className="text-black">{post.views}</p>
                    <GrView className="text-2xl text-black" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this post?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={deleteBlog}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllUserPost;
