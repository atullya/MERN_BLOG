import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import mongoose   from "mongoose";

export const viewAllBlog = async (req, res) => {
  try {
    if(req.query.search){
      const getAllAvailableBlog = await Blog.find({title: { $regex: req.query.search, $options: "i" }});
      if (!getAllAvailableBlog || getAllAvailableBlog.length === 0) {
        return res.status(200).json({ message: "No Blog Available" });
      }
      return res.status(200).json({
        success: true,
        Blogs: getAllAvailableBlog,
      });
    }

    const getAllAvailableBlog = await Blog.find({});
    console.log(getAllAvailableBlog);

    // Store user IDs and names
    let storeUserName = [];

    for (const blog of getAllAvailableBlog) {
      // Convert author to string if it's an ObjectId
      const userId = blog.author.toString();

      // Fetch the user's name by their ID
      const user = await User.findById(userId);

      if (user) {
        storeUserName.push({
          blogId: blog._id,
          userId: user._id,
          userName: user.username, // Assuming `name` exists in the User model
        });
      }
    }

    if (!getAllAvailableBlog || getAllAvailableBlog.length === 0) {
      return res.status(200).json({ message: "No Blog Available" });
    }

    return res.status(200).json({
      success: true,
      Blogs: getAllAvailableBlog,
      Authors: storeUserName, // Include author details
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Internal Server Error: ${error.message}`,
    });
  }
};



export const indvBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    // Validate the blogId
    if (!mongoose.isValidObjectId(blogId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid blog ID format",
      });
    }

    // Find the blog by ID and populate the 'author' field
    const blog = await Blog.findById(blogId).populate("author", "username email phoneNumber profilePic "); 
    // Ensure the 'author' field is referenced correctly in the Blog model

    if (!blog) {
      return res.status(404).json({
        status: false,
        message: "Blog with the specified ID not found",
      });
    }

    // Return the blog along with the author's details
    return res.status(200).json({
      status: true,
      blog: {
        blog:blog,
        author: {
          userId: blog.author._id,
          username: blog.author.username,
          email: blog.author.email,
          phoneNumber: blog.author.phoneNumber,
          profilePic: blog.author.profilePic || "", // Return an empty string if profilePic is not
        },
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      },
    });

  } catch (error) {
    console.error("Error occurred:", error.message);
    return res.status(500).json({
      status: false,
      message: "An internal server error occurred. Please try again later.",
    });
  }
};
