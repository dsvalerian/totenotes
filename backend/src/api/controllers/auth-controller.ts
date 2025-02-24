import User, {UserAttributes} from "../../models/user-model.js";
import bcrypt from "bcrypt";
import {Request, Response} from "express";
import {errorResponse, successResponse} from "../utils.js";
import passport from "passport";

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
      console.log("User already exists");
      return res.status(400).json(errorResponse("User already exists"));
    }

    const newUser = await User.create({
      email: req.body.email,
      passwordHash: await bcrypt.hash(req.body.password, 10)
    });

    return res.status(201).json(stripUserDetails(newUser.get()));
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
  const authenticate = passport.authenticate("local", (err: Error, user: Express.User) => {
    console.info("Logging in user");

    if (err) {
      return res.status(500).json(errorResponse(err.message));
    }

    console.log("user, user");

    if (!user) {
      return res.status(401).json(errorResponse("Invalid credentials"));
    }

    req.login(user, err => {
      if (err) {
        return res.status(500).json(errorResponse(err.message));
      }

      return res.json(successResponse("Successfully logged in"));
    });
  });

  return authenticate(req, res);
};

/**
 * Logout the currently-authenticated user. This is done after passport session authentication
 * @param req
 * @param res
 */
export const logoutUser = async (req: Request, res: Response) => {
  console.info("Logging out user");

  try {
    if (!req.user?.id) {
      console.info("No user to log out");
      return res.status(401).json(errorResponse("No user is logged in"));
    }

    req.logout(error => {
      if (error) {
        console.error(error);
        return res.status(401).json(errorResponse("Failed to log out user"));
      }

      return res.json(successResponse("Logged out"));
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse("Failed to logout user"));
  }
};

export const getLoggedInUser = async (req: Request, res: Response) => {
  try {
    if (req.isAuthenticated()) {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json(errorResponse("User does not exist"));
      }

      return res.json(stripUserDetails(user.get()));
    }
    else {
      return res.status(404).json(errorResponse("No user authenticated"));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse("Failed to get logged in user"));
  }
};

const stripUserDetails = (user: UserAttributes) => {
  const {passwordHash: _, ...rest} = user;
  return rest;
};