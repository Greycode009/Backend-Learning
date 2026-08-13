import express from "express";
import { createBlog, getAllBlogs, getBlogById } from "./blog.controllers.js";
import { VerifyJWT } from "../../middleware/verifyJWT.js";

const blogRouter = express.Router();

blogRouter.post("/", VerifyJWT, createBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlogById);

export default blogRouter;
