import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { VerifyJWT } from "../middleware/verifyJWT.js";
import { verifyRole } from "../middleware/verifyRole.js";

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

//POST route /api/auth/verify-email
authRouter.post("/verify-email", authController.verifyEmail);

//Temporary route for testing purposes
authRouter.get("/profile", VerifyJWT, (req, res) => {
  res.status(200).json({
    message: "Profile route accessed successfully",
    user: req.user,
  });
});

authRouter.get("/admin", VerifyJWT, verifyRole("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin!",
  });
});

export default authRouter;
