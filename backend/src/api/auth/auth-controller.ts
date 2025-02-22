import User from "./user-model.js";
import bcrypt from "bcrypt";
import {Request, Response} from "express";
import {errorResponse, successResponse} from "../utils.js";

/**
 * Register a new user.
 * @param req
 * @param res
 */
export const createUser = async (req: Request, res: Response) => {
  console.info(`Registering user ${req.body.email}`);

  // Check for existing user
  try {
    const existingUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (existingUser) {
      return res.status(400).json(errorResponse("User already exists"));
    }

    const newUser = await User.create({
      email: req.body.email,
      passwordHash: await bcrypt.hash(req.body.password, 10)
    });

    const {passwordHash: _, ...userDetails} = newUser.get();

    return res.status(201).json(userDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json(errorResponse("Failed to register user"));
  }
};

/**
 * Login a user. This is called after passport local authentication.
 * @param req
 * @param res
 */
export const loginUser = async (req: Request, res: Response) => {
  console.info("Logging in user");

  try {
    if (!req.user) {
      return res.status(401).json(errorResponse("Could not login user"));
    }

    return res.send(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json(errorResponse("Failed to login user"));
  }
};

/**
 * Logout the currently-authenticated user. This is done after passport session authentication
 * @param req
 * @param res
 */
export const logoutUser = async (req: Request, res: Response) => {
  console.info("Logging out user");

  try {
    if (!req.user) {
      return res.status(401).json(errorResponse("No user is logged in"));
    }

    req.logout(err => {
      if (err) {
        return res.status(401).json(errorResponse("Failed to log out user"));
      }

      return res.json(successResponse("Logged out"));
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(errorResponse("Failed to logout user"));
  }
};