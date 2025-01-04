import express from "express";
import {
  checkAuth,
  fetchAllImage,
  loginUser,
  logout,
  registerUser,

} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.get("/logout", logout);

authRoutes.get("/check", authMiddleware, checkAuth);
authRoutes.get("/fetch", authMiddleware, fetchAllImage);

export default authRoutes;
