import { Blog } from "./blog.model.js";

export const createBlogService = async (blogData) => {
  const blog = await Blog.create(blogData);

  return blog;
};

export const getAllBlogsService = async () => {
  const blogs = await Blog.find();

  return blogs;
};

export const getBlogByIdService = async (blogId) => {
  const blog = await Blog.findById(blogId);

  return blog;
};
