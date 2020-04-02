var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OAuth2.0 공부한다 👩‍💻' });
});

module.exports = router;
