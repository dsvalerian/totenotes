import express from 'express';
import authRouter from './routers/auth-router.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(`${process.env.DB_CONNECTION_URL}`)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB', err));

const app = express();
const PORT = 3000;

app.use('/auth', authRouter);

app.get('/api', (req, res) => {
  res.send('Welcome to the ToteNotes API');
});

app.listen(PORT, () => {
  console.log(`Server started, listening on port ${PORT}`);
});