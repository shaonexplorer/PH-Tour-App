import passport from "passport";
import googleStrategy from "passport-google-oauth20";
import "dotenv/config";
import { IUser, Role } from "../app/modules/user/user.interface";
import { User } from "../app/modules/user/user.model";

const client_id = process.env.client_id as string;
const client_secret = process.env.client_secret as string;

passport.use(
  new googleStrategy.Strategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
    },
    async function verify(
      accessToken: string,
      refreshToken: string,
      profile: googleStrategy.Profile,
      done: googleStrategy.VerifyCallback
    ) {
      try {
        const isUserExist = await User.find({ email: profile.emails });
        if (!isUserExist) {
          const newUser = await User.create({
            name: profile.name,
            email: profile.emails,
            picture: profile.photos,
            role: Role.USER,
            auths: [{ provider: "google", providerId: profile.id }],
          });
          return done(null, newUser);
        }

        return done(null, isUserExist);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user: Partial<IUser>, done) {
  done(null, { id: user._id, username: user.name, name: user.name });
});

passport.deserializeUser(function (user: Partial<IUser>, done) {
  return done(null, user);
});
