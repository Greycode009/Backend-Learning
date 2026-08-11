import express from "express";
import {
  createComment,
  deleteComment,
  getCommentsByBlog,
  updateComment,
} from "./comment.controllers.js";
import { VerifyJWT } from "../../middleware/verifyJWT.js";
import { validate } from "../../middleware/validate.js";
import { createCommentSchema } from "./comment.validation.js";

const commentRouter = express.Router();

commentRouter.post(
  "/:blogId/comments",
  VerifyJWT,
  validate(createCommentSchema),
  createComment,
);
commentRouter.get("/:blogId/comments", getCommentsByBlog);
commentRouter.put("/:commentId", VerifyJWT, updateComment);
commentRouter.delete("/:commentId", VerifyJWT, deleteComment);

export default commentRouter;
