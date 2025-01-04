import cloudinary from "../config/cloudinary.js"; // Make sure the path is correct

export const uploadToCloudinary = async (filePath) => {
  try {
    // Log the file path before uploading for debugging purposes
    console.log("Uploading file to Cloudinary from path:", filePath);

    // Perform the upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath);

    // Log the upload result for debugging
    console.log("Upload Result:", uploadResult);

    // Return the URL and public ID from the upload result
    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  } catch (error) {
    // Log the error with more detailed information
    console.error("Error while uploading to Cloudinary:", error);

    // Throw an error with a more descriptive message
    throw new Error("Error while uploading to Cloudinary: " + error.message);
  }
};
