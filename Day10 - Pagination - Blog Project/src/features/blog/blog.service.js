import { Blog } from "./blog.model.js";

export const createBlogService = async (blogData) => {
  const blog = await Blog.create(blogData);

  return blog;
};

export const getAllBlogsService = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [blogs, total] = await Promise.all([
    Blog.find().skip(skip).limit(limit),

    Blog.countDocuments(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    blogs,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

export const getBlogByIdService = async (blogId) => {
  const blog = await Blog.findById(blogId);

  return blog;
};

export const updateBlogService = async (blogId, updateData) => {
  const blog = await Blog.findByIdAndUpdate(blogId, updateData, {
    new: true,
    runValidators: true,
  });
  return blog;
};

export const deleteBlogService = async (blogId) => {
  const blog = await Blog.findByIdAndDelete(blogId);

  return blog;
};
