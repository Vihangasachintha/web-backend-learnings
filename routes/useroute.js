import express from "express";
import { createUser, getUser, loginUser, loginWithGoogle, resetPassword, sendOTP, getUsers, updateUserStatus } from "../controllers/userController.js";
import { get } from "mongoose";

const userRouter = express.Router();

userRouter.post("/",createUser)
userRouter.post("/login",loginUser);
userRouter.post("/login/google",loginWithGoogle)
userRouter.post("/send-otp",sendOTP);
userRouter.post("/reset-password",resetPassword);
userRouter.get("/",getUser);
userRouter.get("/allUsers",getUsers);
userRouter.put("/users/:id/status", updateUserStatus);

export default userRouter;