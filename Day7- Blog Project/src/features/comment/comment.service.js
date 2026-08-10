import Comment from "./comment.model.js";

export const createCommentService = async (commentData) => {
  const comment = await Comment.create(commentData);

  return comment;
};

export const getCommentsByBlogService = async (blogId) => {
  const comments = await Comment.find({ blog: blogId });

  return comments;
};
