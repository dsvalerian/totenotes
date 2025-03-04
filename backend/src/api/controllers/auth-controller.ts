import bcrypt from "bcrypt";
import {Request, Response} from "express";
import {errorResponse, successResponse} from "../utils.js";
import passport from "passport";
import {db} from "../../database/database.js";
import {User} from "../../database/user.js";

/**
 * Register a new user.
 * @param req
 * @param res
 */
export const createUser = async (req: Request, res: Response) => {
  console.info(`Registering user ${req.body.email}`);

  // Check for existing user
  try {
    const existingUser = await findUserByEmail(req.body.email);

    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json(errorResponse("User already exists"));
    }

    const currentTime = new Date();
    const newUser = await db
        .insertInto("user")
        .values({
          email: req.body.email,
          password_hash: await bcrypt.hash(req.body.password, 10),
          created_at: currentTime,
          updated_at: currentTime
        })
        .returningAll()
        .executeTakeFirstOrThrow();

    return res.status(201).json(stripUserDetails(newUser));
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

    if (!user?.id) {
      return res.status(401).json(errorResponse("Invalid credentials"));
    }

    req.login(user, async err => {
      if (err) {
        return res.status(500).json(errorResponse(err.message));
      }

      if (!user?.id) {
        return res.status(401).json(errorResponse("Invalid credentials"));
      }

      const existingUser = await findUserById(user.id);

      if (!existingUser) {
        return res.status(500).json(errorResponse("Internal server error"));
      }

      return res.json(stripUserDetails(existingUser));
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
    if (req.isAuthenticated() && req.user?.id) {
      const existingUser = await findUserById(req.user.id);
      if (!existingUser) {
        return res.status(404).json(errorResponse("User does not exist"));
      }

      return res.json(stripUserDetails(existingUser));
    }
    else {
      return res.status(401).json(errorResponse("No user authenticated"));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse("Failed to get logged in user"));
  }
};

const stripUserDetails = (user: User) => {
  const {password_hash: _, ...rest} = user;
  return rest;
};

const findUserById = async (id: number) => {
  return await db
      .selectFrom("user")
      .where("id", "=", id)
      .selectAll()
      .executeTakeFirst();
};

const findUserByEmail = async (email: string) => {
  return await db
    .selectFrom("user")
    .where("email", "=", email)
    .selectAll()
    .executeTakeFirst();
};