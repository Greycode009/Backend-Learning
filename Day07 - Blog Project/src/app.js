import express from "express";
import morgan from "morgan";
import authRouter from "./features/auth/auth.routes.js";
import blogRouter from "./features/blog/blog.routes.js";
import commentRouter from "./features/comment/comment.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/comments", commentRouter);

export default app;
