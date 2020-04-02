const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function (req, res, next) {
    res.render('login', { title: 'OAuth2.0 공부한다 👩‍💻' })
  });
  
// 로그아웃
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth');
});

router.get('/google', passport.authenticate('google', {scope: ['profile']}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth'
}), (req, res) => {
    loginSuccessHandler(req, res);
});

router.get('/github', passport.authenticate('github', {scope: ['profile']}));

router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/auth'
}), (req, res) => {
    loginSuccessHandler(req, res);
});

function loginSuccessHandler(req, res) {
    let successRedirectUrl = "/";

    if (req.cookies.redirectUrl) {
        successRedirectUrl = req.cookies.redirectUrl;
        res.clearCookie("redirectUrl");
    }

    return res.redirect(successRedirectUrl);
}

module.exports = router;