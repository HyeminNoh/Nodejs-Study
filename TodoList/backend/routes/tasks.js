var express = require('express');
var Task = require('../schemas/task');

var router = express.Router();
router.get('/:id', function(req, res, next){
    Task.find({userId: req.params.id}).populate('userId')
    .then((task)=>{
        if(task.length<=0){
            res.json({
                type: false,
                data: "할일이 없어용"
            });
        }
        else{
            //console.log(task);
            res.json({
                type: true,
                data: task
            });
        }
    })
    .catch((err)=>{
        //console.error(err);
        res.json({
            type: false,
            data: "오류 발생: " + err
        });
        next(err);
    });
});
router.post('/', function(req, res, next){
    const task = new Task({
        userId: req.body.id,
        title: req.body.title,
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
    Task.update({_id:req.params.id}, {title: req.body.title, completed: req.body.completed})
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