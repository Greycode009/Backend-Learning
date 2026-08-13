import { z } from "zod";

export const createCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(3, "Comment must be at least 3 characters long"),
});

export const updateCommentSchema = createCommentSchema;
