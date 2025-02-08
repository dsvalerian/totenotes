import express from 'express';
import authRouter from './routers/auth-router.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to DB
if (process.env.DB_CONNECTION_URL && process.env.DB_NAME) {
  mongoose.connect(process.env.DB_CONNECTION_URL, {
    dbName: process.env.DB_NAME
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Could not connect to MongoDB', err));
}
else {
  console.log('Must provide DB connection URL to connect to MongoDB');
  process.exit(1);
}

// Create the app
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server started, listening on port ${PORT}`);
});