import express from "express";
import { indvBlog, viewAllBlog } from "../controllers/guest.controller.js";
const guestRoutes = express.Router();

guestRoutes.get("/allblogs", viewAllBlog);
guestRoutes.get('/allblog/:id',indvBlog);


export default guestRoutes;
