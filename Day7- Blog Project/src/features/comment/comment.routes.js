import express from "express";
import { createComment } from "./comment.controllers.js";
import { VerifyJWT } from "../../middleware/verifyJWT.js";

const commentRouter = express.Router();

commentRouter.post("/:blogId/comments", VerifyJWT, createComment);


export default commentRouter;