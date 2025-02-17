import {Strategy} from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import User, {UserModel} from "../user-model.js";
import {ObjectId} from "mongoose";

interface User {
  _id?: ObjectId;
}

// Called when creating a session
passport.serializeUser((user: User, done) => {
  done(null, user._id);
});

// Called when receiving a session
passport.deserializeUser(async (userId: string, done) => {
  const user = User.findById(userId);
  if (!user) {
    return done(new Error("User not found"));
  }

  return done(null, user);
});


// Authentication and user verification
passport.use(new Strategy(
    {usernameField: "email"},
    async (email, password, done) => {
      console.info(`Authenticating user ${email} through passport`);

      // Check for existing user
      const existingUser: UserModel | null = await User.findOne({email: email});
      if (!existingUser) {
        console.error("User not found");
        return done(new Error("User not found"));
      }

      // Check for correct password
      const passwordsMatch = await bcrypt.compare(password, existingUser.password);
      if (!passwordsMatch) {
        console.error("Passwords do not match");
        return done(null, false);
      }

      // Authenticated
      console.info("Authentication successful");
      return done(null, existingUser);
    }
));