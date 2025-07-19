import passport, { Profile } from "passport";
import {
  Strategy as googleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";

import bcrypt from "bcrypt";
import "dotenv/config";
import { User } from "../modules/user/user.model";
import { IUser, Role } from "../modules/user/user.interface";

const client_id = process.env.client_id as string;
const client_secret = process.env.client_secret as string;

// local credential login

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done("email not found");
        }

        const isPasswordMatch = await bcrypt.compare(
          password,
          user.password as string
        );

        if (!isPasswordMatch) {
          return done("password do not match");
        }

        done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

// google oauth

passport.use(
  new googleStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const isUserExist = await User.findOne({
          email: profile.emails?.[0].value,
        });

        if (!isUserExist) {
          const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails?.[0].value,
            picture: profile.photos?.[0].value,
            isVerified: true,
            role: Role.USER,
            auths: [{ provider: "google", providerId: profile.id }],
          });

          return done(null, newUser);
        } else {
          return done(null, isUserExist);
        }
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user: Partial<IUser>, done) {
  return done(null, { id: user._id, username: user.name, name: user.name });
});

passport.deserializeUser(function (user: Partial<IUser>, done) {
  return done(null, user);
});
