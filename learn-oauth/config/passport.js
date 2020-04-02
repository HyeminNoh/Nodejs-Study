const token = require('./token.json');
const GithubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new GithubStrategy({
            clientID: token.githubId,
            clientSecret: token.githubSecret,
            callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
        }, function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);
        }
    ));

    passport.use(new GoogleStrategy({
            clientID: token.googleId,
            clientSecret: token.googleSecret,
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['https://www.googleapis.com/auth/plus.me']
        }, function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);    
        }
    ));
};
