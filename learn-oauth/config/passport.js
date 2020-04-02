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
        }, function (accessToken, refreshToken, profile, done) {
            const socialId = profile.id;
            const nickname = profile.username;
            const profileImageUrl = profile.photos[0].value;

            onLoginSuccess('Github', socialId, nickname, profileImageUrl, done);
        }
    ));

    passport.use(new GoogleStrategy({
            clientID: "780866566157-bsb69v937g34k2ubldq8irbolsvdi5tn.apps.googleusercontent.com",
            clientSecret: "ZO3RUwgAPL0jw5YEer7drGwo",
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['https://www.googleapis.com/auth/plus.me']
        }, function (accessToken, refreshToken, profile, done) {
            const socialId = profile.id;
            const nickname = profile.displayName;
            const profileImageUrl = profile.photos[0].value;

            onLoginSuccess('Google', socialId, nickname, profileImageUrl, done);
        }
    ));

    function onLoginSuccess(platformName, socialId, nickname, profileImageUrl, done) {
        userService.findOrCreate(platformName, socialId, nickname, profileImageUrl)
            .spread((user, created) => {
                if (user.state === 1) {
                    userService.updateUserToJoinedState(user)
                        .then(result => {
                            done(null, user);
                        })
                        .catch(err => {
                            done(null, user);
                        })
                } else {
                    done(null, user);
                }
            });
    }
};
