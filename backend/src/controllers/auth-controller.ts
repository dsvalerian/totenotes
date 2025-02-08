import User from '../models/user-model.js';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
  console.info(`Registering user ${req.body.email}`);

  // Check for existing users
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    console.info('Skipping, user already exists');
    return res.status(400).json({error: 'User already exists', email: existingUser.email});
  }

  // Creating new user with hashed password
  const newUser = new User({
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10)
  });

  await newUser.save();
  res.status(201).json({message: 'User registered successfully', email: newUser.email});
};