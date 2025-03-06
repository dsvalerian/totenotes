import {Strategy} from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import {db} from "../database/database.js";
import {findUserByEmail, findUserById} from "../utils.js";

// Called when creating a session
passport.serializeUser((user: {id?: number}, done) => {
  return done(null, user.id);
});

// Called when receiving a session
passport.deserializeUser(async (userId: number, done) => {
  const user = await findUserById(userId);

  if (user) {
    return done(null, user);
  }

  return done(new Error("User not found"));
});

// Authentication and user verification
passport.use(new Strategy(
    {usernameField: "email"},
    async (email, password, done) => {
      console.info(`Authenticating user ${email} through passport`);

      // Check for existing user
      const existingUser = await findUserByEmail(email);

      if (!existingUser) {
        console.info("No matching user found");
        return done(null, false);
      }

      // Check for correct password
      const passwordsMatch = await bcrypt.compare(password, existingUser.password_hash);
      if (!passwordsMatch) {
        console.info("Incorrect password");
        return done(null, false);
      }

      console.info("Authentication successful");
      const {password_hash: _, ...userDetails} = existingUser;
      return done(null, userDetails);
    }
));