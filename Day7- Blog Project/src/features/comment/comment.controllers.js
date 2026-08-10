import {
  createCommentService,
  getCommentsByBlogService,
} from "./comment.service.js";
import { Blog } from "../blog/blog.model.js";

export const createComment = async (req, res) => {
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCommentsByBlog = async (req, res) => {
  try {
    const comments = await getCommentsByBlogService(req.params.blogId);

    res.status(200).json({
      success: true,
      message: "Comments fetched successfully.",
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
