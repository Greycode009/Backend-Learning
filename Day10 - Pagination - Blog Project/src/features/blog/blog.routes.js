import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "./blog.controllers.js";
import { VerifyJWT } from "../../middleware/verifyJWT.js";
import {
  createBlogSchema,
  paginationSchema,
  updateBlogSchema,
} from "./blog.validation.js";
import { validate } from "../../middleware/validate.js";

const blogRouter = express.Router();

blogRouter.post("/", VerifyJWT, validate(createBlogSchema), createBlog);
blogRouter.get("/", validate(paginationSchema, "query"), getAllBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.put("/:id", VerifyJWT, validate(updateBlogSchema), updateBlog);
blogRouter.delete("/:id", VerifyJWT, deleteBlog);

export default blogRouter;
