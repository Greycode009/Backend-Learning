import {
  createBlogService,
  deleteBlogService,
  getAllBlogsService,
  getBlogByIdService,
  updateBlogService,
} from "./blog.service.js";
import AppError from "../../utils/AppError.js";

export const createBlog = async (req, res, next) => {
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
    next(error);
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const { search, author, sort, page, limit } = req.validated;

    const blogs = await getAllBlogsService({
      search,
      author,
      sort,
      page,
      limit,
    });
    

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully.",
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    const blog = await getBlogByIdService(req.params.id);
    if (!blog) {
      throw new AppError("Blog not found.", 404);
    }
    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully.",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await getBlogByIdService(req.params.id);

    if (!blog) {
      throw new AppError("Blog not found.", 404);
    }

    if (blog.author.toString() !== req.user.id) {
      throw new AppError("You are not allowed to update this blog.", 403);
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
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await getBlogByIdService(req.params.id);

    if (!blog) {
      throw new AppError("Blog not found.", 404);
    }

    if (blog.author.toString() !== req.user.id) {
      throw new AppError("You are not allowed to update this blog.", 403);
    }

    await deleteBlogService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
