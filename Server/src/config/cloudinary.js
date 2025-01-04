import cloudinary from "cloudinary";

// Debugging log to verify the environment variables

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});
console.log("Cloudinary API Key:", process.env.CLOUDINARY_CLOUD_API_KEY);

export default cloudinary.v2;
