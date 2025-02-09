import User from './user-model.js';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const registerUser = async (request: Request, response: Response) => {
  console.info(`Registering user ${request.body.email}`);

  // Check for existing user
  const existingUser = await User.findOne({ email: request.body.email });
  if (existingUser) {
    console.info('User already exists');
    return response.status(400).json({error: 'User already exists', email: existingUser.email});
  }

  // Creating new user with hashed password
  const newUser = new User({
    email: request.body.email,
    password: await bcrypt.hash(request.body.password, 10)
  });

  await newUser.save();
  return response.status(201).json({message: 'User registered successfully', email: newUser.email});
};

export const loginUser = async (request: Request, response: Response) => {
  console.info(`Logging in user ${request.body.email}`);

  // Check for existing user
  const existingUser = await User.findOne({email: request.body.email});
  if (!existingUser) {
    console.info('User does not exist');
    return response.status(401).json({error: 'User does not exist', email: request.body.email});
  }

  // Check for correct password
  const passwordsMatch = await bcrypt.compare(request.body.password, existingUser.password);
  if (passwordsMatch) {
    // Update the session to track user
    request.session.user = existingUser.email;
    return response.json({message: 'Logged in successfully'});
  }
  else {
    console.info('Incorrect password provided');
    return response.status(401).json({error: 'Incorrect password', email: request.body.email});
  }
};

export const authStatus = async (request: Request, response: Response) => {
  return request.session.user
      ? response.json({user: request.session.user})
      : response.status(401).json({error: 'User not logged in'});
};