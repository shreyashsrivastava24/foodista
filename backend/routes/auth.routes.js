import express from "express";
import { signIn, signUp, signOut, sendOtp, verifyOtp, resetPassword, googleAuth } from "../controllers/auth.controllers.js";

//express se router le k aaye
const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/signout", signOut);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/google-auth", googleAuth);

export default authRouter;