const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', function (req, res, next) {
    let redirectUrl = req.query.redirectUrl;

    if (redirectUrl) {
        res.cookie("redirectUrl", redirectUrl, {
            expires: new Date(Date.now() + (60 * 1000 * 2)),
            httpOnly: true
        });
    }

    res.render('login', { title: 'Login' })
});

// 로그아웃
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google'));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/login'
}), (req, res) => {
    loginSuccessHandler(req, res);
});

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/auth/login'
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