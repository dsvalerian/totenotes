import User from './user-model.js';
import bcrypt from 'bcrypt';
import {Request, Response} from 'express';
import {ResponseBody} from '../server.js';

/**
 * Register a new user.
 * @param req The request.
 * @param res The response.
 */
export const registerUser = async (req: Request, res: Response) => {
  console.info(`Registering user ${req.body.email}`);

  // Check for existing user
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    const responseBody: ResponseBody = {
      success: false,
      message: 'User already exists'
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
 * Authenticate a user.
 * @param req The request.
 * @param res The response.
 */
export const loginUser = async (req: Request, res: Response) => {
  console.info(`Logging in user ${req.body.email}`);

  // Check for existing user
  const existingUser = await User.findOne({email: req.body.email});
  if (!existingUser) {
    const responseBody: ResponseBody = {
      success: false,
      message: 'User does not exist'
    };

    console.info(responseBody.message);
    return res.status(401).json(responseBody);
  }

  // Check for correct password
  const passwordsMatch = await bcrypt.compare(req.body.password, existingUser.password);
  if (passwordsMatch) {
    // Update the session to track user
    req.session.user = existingUser.email;

    const responseBody: ResponseBody = {
      success: true,
      message: `User logged in successfully`,
    };

    console.info(responseBody.message);
    return res.json(responseBody);
  }
  else {
    const responseBody: ResponseBody = {
      success: false,
      message: `Incorrect password provided`
    };

    console.info(responseBody.message);
    return res.status(401).json(responseBody);
  }
};