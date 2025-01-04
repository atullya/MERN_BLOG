import User from "../models/user.model.js";
import Image from "../models/image.model.js";
import bcrypt from "bcrypt";

import { generateToken } from "../utils/accessToken.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, role } = req.body;

    // Check for missing fields
    if (!username || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if user already exists
    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with that email",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Register new user
    const registerUser = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    const insertUser = await registerUser.save();

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the user exists
    const userValid = await User.findOne({ email });
    if (!userValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Compare the provided password with the stored hashed password
    const validPassword = await bcrypt.compare(password, userValid.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    //generate Token
    const token = generateToken(userValid._id, res);
    res.status(200).json({
      _id: userValid._id,
      username: userValid.username,
      email: userValid.email,
      profilePic: userValid.profilePic,
      role: userValid.role,
      success: true,
      message: "Login successful",
      accessToken: token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in Logout Controller", error);
    return res.status(500).json({ message: "Internaal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in signup", error);
    return res.status(500).json({ message: "Internaal Server Error" });
  }
};

export const fetchAllImage = async (req, res) => {
  try {
    let getAllImages = await Image.find({});
    if (!getAllImages) {
      return res.status(400).json({
        message: "Unable to Fetch Data...",
      });
    }
    return res.status(200).json({
      success: true,
      Images: getAllImages,
    });
  } catch (error) {
    console.log(error);
  }
};
