import {config} from 'dotenv';
import passport from 'passport';
import {Strategy as MicrosoftStrategy} from 'passport-microsoft';

config()
passport.use("auth-microsoft", new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: "https://api-marioutn-salazar.onrender.com/auth/microsoft/callback",
    scope: ["user.read", "calendars.read", "mail.send", "mail.read", "offline_access"],
    authorizationURL: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token"
}, function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log(accessToken)
    done(null, profile)
}))