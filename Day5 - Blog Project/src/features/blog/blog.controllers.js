import { createBlogService } from "./blog.service.js";

export const createBlog = async (req, res) => {
  try {
    const blog = await createBlogService({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully.",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
