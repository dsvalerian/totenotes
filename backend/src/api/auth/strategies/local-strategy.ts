import {Strategy} from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import User from "../user-model.js";

// Called when creating a session
passport.serializeUser((user: {id?: number}, done) => {
  return done(null, user.id);
});

// Called when receiving a session
passport.deserializeUser(async (userId: number, done) => {
  const user = await User.findByPk(userId);
  if (user) {
    return done(null, user.get());
  }

  return done(new Error("User not found"));
});


// Authentication and user verification
passport.use(new Strategy(
    {usernameField: "email"},
    async (email, password, done) => {
      console.info(`Authenticating user ${email} through passport`);

      // Check for existing user
      const existingUser = await User.findOne({
        where: {
          email: email,
        }
      });

      if (existingUser) {
        const userData = existingUser.get();

        // Check for correct password
        const passwordsMatch = await bcrypt.compare(password, existingUser.get().passwordHash);
        if (passwordsMatch) {
          console.info("Authentication successful");
          const {passwordHash: _, ...userDetails} = userData;
          return done(null, userDetails);
        }

        console.error("Authentication failed, incorrect password");
        return done(null, false);
      }

      console.error("User not found");
      return done(new Error("User not found"));
    }
));