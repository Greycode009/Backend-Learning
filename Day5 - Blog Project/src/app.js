import express from "express";
import morgan from "morgan";
import authRouter from "./features/auth/auth.routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRouter);

export default app;
