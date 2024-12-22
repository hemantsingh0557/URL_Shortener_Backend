import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User"; 
import config from "./index.js"; 


passport.use(
    new GoogleStrategy(
        {
            clientID: config.auth.google.clientId,
            clientSecret: config.auth.google.clientSecret,
            callbackURL: config.auth.google.callbackUrl,
        },
        async function(token, tokenSecret, profile, done) {
            const user = await User.findOne({ googleId: profile.id });
            if (!user) {
                const newUser = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    profilePic: profile.photos[0].value,
                });
                await newUser.save();
                return done(null, newUser);
            }
            return done(null, user);
        },
    ),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

export default passport;






