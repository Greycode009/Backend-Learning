import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter = Router();

//POST route /api/auth/register
authRouter.post("/register", authController.register);

//POST route /api/auth/login
authRouter.post("/login", authController.login);

//GET route /api/auth/get-me
authRouter.get("/get-me", authController.getMe);

//GET route /api/auth/refresh-token
authRouter.get("/refresh-token", authController.refreshToken);

//GET route /api/auth/logout
authRouter.get("/logout", authController.logout);

//GET route /api/auth/logout-all
authRouter.get("/logout-all", authController.logoutAll);

//GET route /api/auth/verify-email
authRouter.get("/verify-email", authController.verifyEmail);

export default authRouter;
