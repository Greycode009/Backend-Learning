import {
  createCommentService,
  deleteCommentService,
  getCommentsByBlogService,
  updateCommentService,
} from "./comment.service.js";
import Comment from "./comment.model.js";
import { Blog } from "../blog/blog.model.js";

export const createComment = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    const comment = await createCommentService({
      content: req.body.content,
      author: req.user.id,
      blog: req.params.blogId,
    });

    res.status(201).json({
      success: true,
      message: "Comment created successfully.",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

export const getCommentsByBlog = async (req, res, next) => {
  try {
    const comments = await getCommentsByBlogService(req.params.blogId);

    res.status(200).json({
      success: true,
      message: "Comments fetched successfully.",
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this comment.",
      });
    }

    const updatedComment = await updateCommentService(req.params.commentId, {
      content: req.body.content,
    });

    res.status(200).json({
      success: true,
      message: "Comment updated successfully.",
      data: updatedComment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  try {
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this comment.",
      });
    }
    await deleteCommentService(req.params.commentId);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
