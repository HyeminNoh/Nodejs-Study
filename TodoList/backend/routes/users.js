var express = require('express');
const moment = require('moment');
var User = require('../schemas/user');

var router = express.Router();

moment.tz.setDefault("Asia/Seoul");

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({})
  .then((user)=>{
    console.log(user);
    res.json(user);
  })
  .catch((err)=>{
    console.error(err);
    next(err);
  })
});

router.get('/:name', function(req, res, next){
  User.find({name: req.params.name})
  .then((user)=>{
      console.log(user);
      res.json(user);
  })
  .catch((err)=>{
      console.error(err);
      next(err);
  });
});

router.post('/', function(req, res, next){
  const user = new User({
    name: req.body.name,
    pwd: req.body.title,
    createdAt: moment().format('YYYY-MM-DD')
  });
  user.save()
  .then((result)=>{
      return User.populate(result, {path: 'userId'});
  })
  .then((result)=>{
      res.status(201).json(result);
  })
  .catch((err)=>{
      console.error(err);
      next(err);
  });
});

router.delete('/:name', function(req, res, next){
  Task.remove({name: req.params.name})
  .then((result)=>{
      res.json(result);
  })
  .catch((err)=>{
      console.error(err);
      next(err);
  });
});

module.exports = router;
