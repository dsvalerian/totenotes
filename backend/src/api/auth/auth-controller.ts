import User, {UserModel} from "./user-model.js";
import bcrypt from "bcrypt";
import {Request, Response} from "express";
import {ResponseBody} from "../types.js";

/**
 * Register a new user.
 * @param req
 * @param res
 */
export const registerUser = async (req: Request, res: Response) => {
  console.info(`Registering user ${req.body.email}`);

  // Check for existing user
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    const responseBody: ResponseBody = {
      success: false,
      message: "User already exists"
    };

    console.info(responseBody.message);
    return res.status(400).json(responseBody);
  }

  // Creating new user with hashed password
  const newUser = new User({
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10)
  });

  await newUser.save();

  const responseBody: ResponseBody = {
    success: true,
    message: `User ${newUser.email} registered successfully`,
  };
  return res.status(201).json(responseBody);
};

/**
 * Login a user. This is called after passport local authentication.
 * @param req
 * @param res
 */
export const loginUser = async (req: Request, res: Response) => {
  const responseBody: ResponseBody = {
    success: true,
    message: "Logged in"
  };

  return res.json(responseBody);
};

/**
 * Logout the currently-authenticated user. This is done after passport session authentication
 * @param req
 * @param res
 */
export const logoutUser = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({success: false, message: "No logged in user to log out"});
  }

  req.logout(err => {
    if (err) {
      return res.status(401).json({success: false, message: err.message});
    }

    return res.status(200).json({success: true, message: "User successfully logged out"});
  });
};