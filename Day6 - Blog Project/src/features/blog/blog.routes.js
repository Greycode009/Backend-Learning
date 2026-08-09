import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "./blog.controllers.js";
import { VerifyJWT } from "../../middleware/verifyJWT.js";


const blogRouter = express.Router();

blogRouter.post("/", VerifyJWT, createBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.put("/:id", VerifyJWT, updateBlog);
blogRouter.delete("/:id", VerifyJWT, deleteBlog);

export default blogRouter;
