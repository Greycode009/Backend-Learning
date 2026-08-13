import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter = Router();

//POST route /api/auth/register
authRouter.post("/register", authController.register);

//GET route /api/auth/get-me
authRouter.get("/get-me", authController.getMe);

export default authRouter;
