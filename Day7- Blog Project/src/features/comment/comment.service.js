import Comment from "./comment.model.js";

export const createCommentService = async (commentData) => {
  const comment = await Comment.create(commentData);

  return comment;
};

