var express = require('express');
var router = express.Router();

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect('/auth');
  }
};

/* GET home page. */
router.get('/', authenticateUser, function(req, res, next) {
  res.render('index', { title: 'OAuth2.0 공부한다 👩‍💻' });
});

module.exports = router;
