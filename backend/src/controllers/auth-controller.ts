import User from '../models/user-model.js';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
  // Check for existing users
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({error: 'User already exists'});
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new User({
    email: req.body.email,
    password: hashedPassword
  });

  await newUser.save();
  res.status(201).json({message: 'User registered successfully'});
};