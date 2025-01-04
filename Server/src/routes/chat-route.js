import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getMessages,sendMessage } from "../controllers/chat.controller.js";

const chatRoutes = express.Router();

chatRoutes.get("/chat/:userId",authMiddleware, getMessages );
chatRoutes.post("/chat/:userId",authMiddleware, sendMessage );
export default chatRoutes;