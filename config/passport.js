import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./index.js"; 
import { userService } from "../services/index.js";


passport.use(
    new GoogleStrategy(
        {
            clientID: config.auth.google.clientId,
            clientSecret: config.auth.google.clientSecret,
            callbackURL: config.auth.google.callbackUrl,
        },
        async function(token, tokenSecret, profile, done) {
            try {
                const user = await userService.findOne({ googleId: profile.id });
                if (!user) {
                    const newUser = await userService.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        profilePic: profile.photos[0] ? profile.photos[0].value : " ", 
                    });
                    return done(null, newUser);
                }
                return done(null, user);
            } 
            catch (error) {
                return done(error, null) ;
            }
        },
    ),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(userId, done) => {
    const user = await userService.findOne({ _id : userId });
    done(null, user);
});

export default passport;






