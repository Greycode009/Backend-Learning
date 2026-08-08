import express from "express";
import { createBlog } from "./blog.controllers.js";
import { VerifyJWT } from "../../middleware/verifyJWT.js";

const blogRouter = express.Router();

blogRouter.post("/", VerifyJWT, createBlog);

export default blogRouter;
