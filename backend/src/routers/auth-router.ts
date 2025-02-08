import express from 'express';
import {registerUser} from '../controllers/auth-controller.js';

const authRouter = express.Router();

authRouter.use('/register', registerUser);

export default authRouter;