import {createUser, getLoggedInUser, loginUser, logoutUser} from "../controllers/auth-controller.js";
import express from "express";

const authRouter = express.Router();
authRouter.post("/user", createUser);
authRouter.get("/user", getLoggedInUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);

export default authRouter;