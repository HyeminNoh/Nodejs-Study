var express = require('express');
var Task = require('../schemas/task');

var router = express.Router();
router.get('/:id', function(req, res, next){
    Task.find({userId: req.params.id}).populate('userId')
    .then((task)=>{
        console.log(task);
        res.json(task);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
});
router.post('/', function(req, res, next){
    const task = new Task({
        userId: req.body.id,
        title: req.body.title,
        content: req.body.content,
        completed: req.body.completed,
    });
    task.save()
    .then((result)=>{
        return Task.populate(result, {path: 'userId'});
    })
    .then((result)=>{
        res.status(201).json(result);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
});
router.patch('/:id', function(req, res, next){
    Task.update({_id:req.params.id}, {title: req.body.title, content: req.body.content, completed: req.body.completed})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
});
router.delete('/:id', function(req, res, next){
    Task.remove({_id: req.params.id})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
});

module.exports = router;