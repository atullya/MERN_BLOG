import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkAdmin } from "../middleware/admin-middlware.js";
import uploadMiddleware from "../middleware/upload-middleware.js";
import { getUser, uploadImage } from "../controllers/admin.controller.js";

const adminRoutes = express.Router();

// Admin welcome route
adminRoutes.get("/welcome", authMiddleware, checkAdmin, (req, res) => {
 
 res.status(200).json({message: "Welcome Admin",user:req.user});
});

// Route to handle image upload
adminRoutes.post(
  "/upload",
  authMiddleware, // Ensure user is authenticated
  checkAdmin, // Ensure user is an admin
  uploadMiddleware.single("image"), // Handle file upload
  uploadImage // Image upload handler
);
adminRoutes.get('/getalluser',authMiddleware,checkAdmin,getUser)

export default adminRoutes;
