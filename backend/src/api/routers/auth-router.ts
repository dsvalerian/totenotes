import {createUser, loginUser, logoutUser} from "../controllers/auth-controller.js";
import express from "express";
import passport from "passport";

const authRouter = express.Router();
authRouter.post("/register", createUser);
authRouter.post("/login", passport.authenticate("local"), loginUser);
authRouter.post("/logout", logoutUser);

export default authRouter;