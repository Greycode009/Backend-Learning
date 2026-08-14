import { Blog } from "./blog.model.js";

export const createBlogService = async (blogData) => {
  const blog = await Blog.create(blogData);

  return blog;
};

export const getAllBlogsService = async ({
  search,
  author,
  sort,
  page = 1,
  limit = 10,
}) => {
  const skip = (page - 1) * limit;
  //Filter
  const filter = {};
  if (author) {
    filter.author = author;
  }
  //Search
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }
  const sortOrder = sort === "oldest" ? 1 : -1;

  const [blogs, total] = await Promise.all([
    Blog.find(filter).sort({ createdAt: sortOrder }).skip(skip).limit(limit),

    Blog.countDocuments(filter),
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
