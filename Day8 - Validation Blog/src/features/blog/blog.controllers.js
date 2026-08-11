import {
  createBlogService,
  deleteBlogService,
  getAllBlogsService,
  getBlogByIdService,
  updateBlogService,
} from "./blog.service.js";

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

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await getAllBlogsService();

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully.",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await getBlogByIdService(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully.",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await getBlogByIdService(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this blog.",
      });
    }

    const updatedBlog = await updateBlogService(req.params.id, {
      title: req.body.title,
      content: req.body.content,
    });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  const blog = await getBlogByIdService(req.params.id);
  try {
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this blog.",
      });
    }

    await deleteBlogService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
