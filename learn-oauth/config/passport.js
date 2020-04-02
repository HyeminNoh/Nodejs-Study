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
            clientID: "a51d7f734aeb8afa214b",
            clientSecret: "266a4c83efd184917d583adaa24facda48c06c67",
            callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
        }, function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);
        }
    ));

    passport.use(new GoogleStrategy({
            clientID: "780866566157-bsb69v937g34k2ubldq8irbolsvdi5tn.apps.googleusercontent.com",
            clientSecret: "ZO3RUwgAPL0jw5YEer7drGwo",
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['https://www.googleapis.com/auth/plus.me']
        }, function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);    
        }
    ));
};
