import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import Image from "../models/image.model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
// Get the current directory path in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const welcomeUser = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Welcome!",
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadBlog = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded. Please upload at least one image.",
      });
    }

    const blogInfo = req.body;
    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`); // Path of the uploaded image

    const newBlog = new Blog({
      title: blogInfo.title,
      content: blogInfo.content,
      author: req.user._id, // assuming req.user contains the authenticated user
      tags: blogInfo.tags,
      category: blogInfo.category,
      images: imagePaths,
      status: blogInfo.status,
    });

    const uploadedBlog = await newBlog.save();

    if (!uploadedBlog) {
      return res
        .status(500)
        .json({ success: false, message: "Blog upload failed!" });
    }

    return res
      .status(201)
      .json({ success: true, message: "Blog uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading blog:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while uploading blog.",
    });
  }
};

export const viewAvailableAllBlog = async (req, res) => {
  try {
    if (req.query.search) {
      const getAllAvailableBlog = await Blog.find({
        title: { $regex: req.query.search, $options: "i" },
      });
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

export const getUploadedBlog = async (req, res) => {
  try {
    const getUserId = req.user._id;
    if (!getUserId) {
      return res.status(400).json({
        success: false,
        message: "You are not an authorized user!",
      });
    }
    // Fetch all posts uploaded by the logged-in user
    const userPosts = await Blog.find({ author: getUserId });
    if (!userPosts || userPosts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found for this user",
      });
    }
    return res.status(200).json({
      success: true,
      posts: userPosts, // Return only the posts of the logged-in user
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteBlog = await Blog.findByIdAndDelete(id);
    if (!deleteBlog) {
      return res.status(400).json({
        success: false,
        message: "Cannot Delete a Blog!. Invalid Id!!",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Successfully deleted a Blog" });
  } catch (error) {
    console.log(error);
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;

    const indvBlog = await Blog.findById(blogId);
    if (!indvBlog) {
      return res
        .status(404)
        .json({ message: "Cannot find the blog with that id" });
    }
    return res.status(200).json({
      status: true,
      Blogs: indvBlog,
    });
  } catch (error) {
    console.log(error);
  }
};
export const likeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id; // Assume user ID is available in `req.user`

    // Find the blog
    const blog = await Blog.findById(blogId).populate(
      "likedBy",
      "username email"
    );

    // If blog is not found
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    // Check if the user has already liked the blog
    const userIndex = blog.likedBy.findIndex(
      (user) => user._id.toString() === userId.toString()
    );

    if (userIndex !== -1) {
      // User already liked → Unlike (remove user from likedBy array)
      blog.likedBy.splice(userIndex, 1);
      blog.likes -= 1;
      await blog.save();

      return res.status(200).json({
        success: true,
        message: "Blog unliked successfully!",
        updatedLikes: blog.likes,
        allLikedUsers: blog.likedBy, // Updated likedBy list
      });
    } else {
      // User hasn't liked → Like (add user to likedBy array)
      blog.likedBy.push(userId);
      blog.likes += 1;
      await blog.save();

      // Populate likedBy field again to get user details
      const updatedBlog = await Blog.findById(blogId).populate(
        "likedBy",
        "username email"
      );

      return res.status(200).json({
        success: true,
        message: "Blog liked successfully!",
        updatedLikes: updatedBlog.likes,
        allLikedUsers: updatedBlog.likedBy,
      });
    }
  } catch (error) {
    console.error("Error while liking/unliking the blog:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while liking/unliking the blog.",
      error: error.message,
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id; // Assume user ID is added to `req.user` by authentication middleware
    const { comment } = req.body; // Expect a single comment in the request body

    // Find the blog
    const blog = await Blog.findById(blogId);

    // If blog is not found
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    // Add the new comment to the comments array
    blog.comments.push({
      user: userId,
      comment: comment,
    });

    // Save the updated blog
    await blog.save();

    // Return the updated blog
    return res.status(200).json({
      success: true,
      message: "Comment added successfully!",
      blog,
    });
  } catch (error) {
    console.error("Error while adding a comment:", error);

    // Return error response
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding a comment.",
      error: error.message,
    });
  }
};
export const incrementViewCount = async (req, res) => {
  try {
    const blogId = req.params.id;

    // Find and update the blog, incrementing the views count
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { $inc: { views: 1 } }, // $inc operator increments the views field
      { new: true } // Return the updated blog document
    );

    // If blog is not found
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "View count incremented successfully.",
      blog,
    });
  } catch (error) {
    console.error("Error incrementing view count:", error);

    // Return error response
    return res.status(500).json({
      success: false,
      message: "An error occurred while incrementing the view count.",
      error: error.message,
    });
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID comes from authentication middleware
    const { username, email } = req.body; // Extract new data from request body

    // Validate input
    if (!username || !email) {
      return res.status(400).json({
        success: false,
        message: "Username and email are required.",
      });
    }

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Handle profile picture upload
    let profilePicPath = user.profilePic; // Keep the old profile pic by default
    if (req.file) {
      // New profile pic uploaded
      const newImagePath = path.join(
        __dirname,
        "..",
        "uploads",
        req.file.filename
      );

      // Optionally delete the old profile pic if it exists
      if (user.profilePic && fs.existsSync(user.profilePic)) {
        fs.unlinkSync(user.profilePic);
      }

      profilePicPath = newImagePath;
    }

    // Update user information
    user.username = username;
    user.email = email;
    user.profilePic = profilePicPath;

    // Save updated user data
    await user.save();

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: {
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);

    // Return error response
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the profile.",
      error: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old and new passwords are required",
      });
    }

    const getUser = req.user; // Ensure this is set correctly by middleware
    if (!getUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!getUser.password) {
      return res.status(400).json({
        success: false,
        message: "User password is not available",
      });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, getUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    getUser.password = hashedPassword;

    const saveUser = await getUser.save();
    if (!saveUser) {
      return res.status(400).json({
        success: false,
        message: "Password not updated",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Internal Server Error: ${error.message}`,
    });
  }
};
