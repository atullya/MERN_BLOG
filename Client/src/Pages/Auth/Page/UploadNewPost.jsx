import React, { useState } from "react";
import axios from "axios";
import Aside from "../Aside";
import ReactQuill from "react-quill"; // Import Quill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import upload_area from "../../../assets/upload_area.png";
import { BASE_URL } from "../../../App";

const UploadNewPost = () => {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [authorId, setAuthorId] = useState("12345"); // Example author ID
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); // To display the uploaded image
  const [content, setContent] = useState(""); // To store content of the blog post
  const [isUploading, setIsUploading] = useState(false); // Track upload status
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5000000 && file.type.startsWith("image/")) {
      // Example for max size of 5MB
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    } else {
      alert("Invalid file. Please upload a valid image under 5MB.");
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    // Extract plain text content (no HTML tags)
    const plainTextContent = content.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("status", status);
    formData.append("authorId", authorId);
    formData.append("content", plainTextContent); // Append only plain text content

    if (image) {
      formData.append("image", image); // Append the image file
    }
    setIsUploading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/blog/upload`,
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Blog uploaded successfully!");

        // Reset form fields after successful submission
        setTitle(""); // Clear the title input after successful submission
        setTags(""); // Clear tags input
        setCategory("General"); // Reset category to default
        setStatus("draft"); // Reset status to default
        setAuthorId("12345"); // Reset author ID to default
        setImage(null); // Clear image input
        setUploadedImage(null); // Clear uploaded image
        setContent(""); // Clear the content of the editor
      } else {
        alert("Failed to upload the blog.");
      }
    } catch (error) {
      console.error("Error uploading blog:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex">
      <Aside />
      <div className="flex flex-col w-full p-6">
        {/* Title Input */}
        <div className="relative mb-6">
          <label
            className={`absolute left-4 transition-all duration-300 ${
              isActive
                ? "top-[-2px] text-sm text-[#F57C00]"
                : "top-4 text-base text-gray-500"
            }`}
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(title !== "")}
            className="border-b-2 w-full border-[#F57C00] outline-none p-3"
          />
        </div>

        {/* Category Input */}
        <div className="relative mb-6">
          <label className="absolute left-4 transition-all duration-300 top-4 text-base text-gray-500">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-b-2 w-full border-[#F57C00] mt-8 outline-none p-3"
          >
            <option value="General">General</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* Tags Input */}
        <div className="relative mb-6">
          <label className="absolute left-4 top-[-10px] transition-all duration-300">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(tags !== "")}
            className="border-b-2 w-full border-[#F57C00] outline-none p-3"
          />
        </div>

        {/* Image Upload Input */}
        <div className="relative mb-6">
          <label htmlFor="image" className="cursor-pointer">
            <div className="relative">
              <img
                src={uploadedImage || upload_area}
                alt="Upload Area"
                className="w-[200px] h-[200px] object-cover border-2 border-dashed border-[#F57C00] rounded-lg"
              />
              {!uploadedImage && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-semibold">
                  Upload Image
                </span>
              )}
            </div>
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
        </div>

        {/* Quill Text Editor for Content */}
        <div className="relative mb-6">
          <label
            className={`absolute left-4 transition-all duration-300 ${
              isActive
                ? "top-[-2px] text-sm text-[#F57C00]"
                : "top-4 text-base text-gray-500"
            }`}
          >
            Content
          </label>
          <ReactQuill
            value={content}
            onChange={setContent} // Handle content change
            theme="snow"
            className="h-[300px] border-[#F57C00] border-b-2"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isUploading} // Disable button while uploading
          className="mt-6 px-6 py-2 bg-[#F57C00] cursor-pointer text-white rounded hover:bg-[#d66a00]"
        >
          {isUploading ? "Uploading..." : "Submit Post"}{" "}
        </button>
      </div>
    </div>
  );
};

export default UploadNewPost;
