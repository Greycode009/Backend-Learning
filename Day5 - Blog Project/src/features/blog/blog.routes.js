import express from "express";
import { createBlog, getAllBlogs } from "./blog.controllers.js";
import { VerifyJWT } from "../../middleware/verifyJWT.js";

const blogRouter = express.Router();

blogRouter.post("/", VerifyJWT, createBlog);
blogRouter.get("/", getAllBlogs);

export default blogRouter;
