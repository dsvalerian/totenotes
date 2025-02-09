import express from 'express';
import authRouter from './auth/auth-router.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import { Request, Response } from 'express';

// Augmenting express-session with custom object
declare module 'express-session' {
  interface SessionData {
    user: string
  }
}

dotenv.config();

// Connect to DB
if (process.env.DB_CONNECTION_URL && process.env.DB_NAME) {
  mongoose.connect(process.env.DB_CONNECTION_URL, {
    dbName: process.env.DB_NAME
  })
  .then(() => console.info('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  });
}
else {
  console.error('Must provide DB connection URL to connect to MongoDB');
  process.exit(1);
}

// Create the app
const app = express();
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'test-dev',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));

app.get('/api/ping', (request: Request, response: Response) => {
  return response.json({message: 'Server is running'});
});

// Registering routes
app.use('/api/auth', authRouter);

// Start listening
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.info(`Server started, listening on port ${PORT}`);
});