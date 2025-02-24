import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import "./strategies/local-strategy.js";
import apiRouter from "./api/routers/api-router.js";
import sequelize from "./config/database.js";
import cors from "cors";

dotenv.config();

// Connect to db
await sequelize.authenticate();
console.log("Connected to Postgres DB");

// Create the app
const app = express();
app.use(express.json());

// Adding support for sessions
app.use(session({
  secret: process.env.SESSION_SECRET || "test-dev",
  saveUninitialized: true,
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: 30 * 60 * 1000
  }
}));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Setting up passport authentication
app.use(passport.initialize());
app.use(passport.session());

// Registering routes
app.use("/api", apiRouter);

// Start listening
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.info(`Server started, listening on port ${PORT}`);
});