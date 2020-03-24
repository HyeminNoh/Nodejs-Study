var express = require('express');

var jwt = require('jsonwebtoken');
var jwtSecret = 'jwtsecret'
var User = require('../schemas/user');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({})
    .then((user) => {
      console.log(user);
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
});

router.post('/login', function (req, res, next) {
  const user = {
    name: req.body.name,
    pwd: req.body.pwd,
  }
  User.findOne(user)
    .exec(function (err, result) {
      if (err) {
        res.json({
          type: false,
          data: "Error occured " + err
        });
      } else if (result == null) {
        res.json({
          type: false,
          data: "Incorrect email/password"
        });
      } else if (result != null) {
        res.json({
          type: true,
          data: result,
          token: result.jsonWebToken
        });
      }
    });
});

router.post('/signup', function (req, res, next) {
  const name = req.body.name;
  const pwd = req.body.pwd;
  User.findOne({name: name})
    .exec(function (err, result) {
      if (err) {
        res.json({
          type: false,
          data: "Error occured " + err
        });
      } else if (result != null) {
        res.json({
          type: false,
          data: "name already exists"
        });
      } else if (result == null) {
        localSignup(name, pwd, function (err, savedUser) {
          if (err) {
            res.json({
              type: false,
              data: "Error occured " + err
            });
          } else {
            res.json({
              type: true,
              data: savedUser,
              token: savedUser.jsonWebToken
            });
          }
        });
      }
    })
});

function localSignup(userName, userPassword, next) {
  var userModel = new User({
    name: userName,
    pwd: userPassword,
  });
  console.log("사용자 등록: "+userModel);
  userModel.save(function (err, newUser) {
      var token = jwt.sign(userModel.toJSON(), jwtSecret)
      newUser.jsonWebToken = token
      newUser.save(function (err, savedUser) {
          next(err, savedUser);
      });
  });
}

router.get('/me', ensureAuthorized, function (req, res, next) {
  var findConditionToken = {
      jsonWebToken: req.token
  };
  User.findOne(findConditionToken, function (err, result) {
      if (err){
          res.json({
              type: false,
              data: "Error occured: " + err
          });
      } else {
          ßconsole.log("me : " + result);
          res.json({
              type: true,
              data: result
          });
      }
  })
});

function ensureAuthorized(req, res, next) {
  var bearerToken;
  var bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
      var bearer = bearerHeader.split(" ");
      bearerToken = bearer[1];
      req.token = bearerToken;
      next();
  } else {
      res.send(403);
  }
}

router.delete('/:name', function (req, res, next) {
  User.remove({ name: req.params.name })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
