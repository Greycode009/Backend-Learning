import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters long"),

  content: z
    .string()
    .trim()
    .min(10, "Content must be at least 10 characters long"),
});

export const updateBlogSchema = createBlogSchema.partial();

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
