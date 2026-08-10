import { createCommentService } from "./comment.service.js";



export const createComment = async (req, res) => {
  try {
    



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
