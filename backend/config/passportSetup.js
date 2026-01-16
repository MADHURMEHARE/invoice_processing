import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";

const googleAuth = () => {
  // ✅ SAFETY GUARD (VERY IMPORTANT)
  if (
    !process.env.GOOGLE_CLIENT_ID ||
    !process.env.GOOGLE_CLIENT_SECRET ||
    !process.env.GOOGLE_CALLBACK_URL
  ) {
    console.warn("⚠️ Google OAuth env variables missing. Skipping Google Auth.");
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleID: profile.id });

          if (!user) {
            const name = profile.displayName?.split(" ") || [];

            user = await User.create({
              username: profile._json.given_name,
              firstName: name[0] || "",
              lastName: name[1] || "",
              avatar: profile._json.picture,
              email: profile._json.email,
              googleID: profile.id,
              isEmailVerified: profile._json.email_verified,
              provider: "google",
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

export default googleAuth;
