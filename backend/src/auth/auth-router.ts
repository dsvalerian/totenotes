import express from 'express';
import {loginUser, registerUser, authStatus} from './auth-controller.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/status', authStatus);

export default authRouter;