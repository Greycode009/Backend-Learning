import express from "express";
import { createComment, getCommentsByBlog } from "./comment.controllers.js";
import { VerifyJWT } from "../../middleware/verifyJWT.js";

const commentRouter = express.Router();

commentRouter.post("/:blogId/comments", VerifyJWT, createComment);
commentRouter.get("/:blogId/comments", getCommentsByBlog);

export default commentRouter;
