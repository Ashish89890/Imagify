import { registerUser, loginUser,userCredits, paymentRazorpay, verifyrazorpay } from "../controller/user.control.js";
import express from "express";
import UserAuth from "../middlewears/auth.js";
const UserRouter = express.Router();

UserRouter.post("/register", registerUser)
UserRouter.post("/login", loginUser)
UserRouter.get("/credits", UserAuth, userCredits);
UserRouter.post("/pay", UserAuth, paymentRazorpay);
UserRouter.post("/verify-razor",verifyrazorpay);


export default UserRouter;