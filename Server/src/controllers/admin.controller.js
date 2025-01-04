import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";
import Image from "../models/image.model.js";
import User from "../models/user.model.js"
// Get the current directory path in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const uploadImage = async (req, res) => {
  try {
    // Check if file is missing in the request object
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image",
      });
    }

    // Extract image title and description from the request body
    const { imageTitle, imageDescription } = req.body;

    // Check if title and description are available
    if (!imageTitle || !imageDescription) {
      return res.status(400).json({
        success: false,
        message: "Both image title and description are required.",
      });
    }

    // Get the image's file path
    const imagePath = path.join(__dirname, "..", "uploads", req.file.filename);

    // Create a new image document to store in the database
    const newlyUploadedImage = new Image({
      url: imagePath, // Store the local file path in the 'url' field
      publicId: req.file.filename, // Use the filename as a publicId
      uploadedBy: req.user._id, // Assuming userInfo is attached to req in the middleware
      imageTitle,
      imageDescription,
    });

    // Save the image to the database
    await newlyUploadedImage.save();

    // Return success response with the uploaded image details
    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newlyUploadedImage,
    });
  } catch (error) {
    // Improved error logging for debugging
    console.error("Error occurred during image upload:", error);

    // Return generic error response
    res.status(500).json({
      success: false,
      message: "Internal Server Error - Unable to upload image.",
    });
  }
};

export const getUser=async (req,res)=>{
  try{
    const allUser=await User.find({ role: { $ne: "admin" } });
    console.log(allUser);
    return res.status(200).json({Users:allUser});


  }catch(error){
    console.log(error);
  }
}
