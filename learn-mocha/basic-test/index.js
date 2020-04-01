var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');

var users = [
    {id: 1, name: 'tufu'},
    {id: 2, name: 'love'},
    {id: 3, name: 'hyemin'},
];
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/users', function(req, res){
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if(Number.isNaN(limit)){
        return res.status(400);
    }
    res.json(users.slice(0, limit));
});

app.get('/users/:id', function(req, res){
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();
    const user = users.filter((user)=>user.id === id)[0];
    if(!user) return res.status(404).end();
    res.json(user);
});

app.delete('/users/:id', function(req, res){
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();
    users = users.filter(user=>user.id !== id);
    res.status(204).end();
});

app.post('/users', (req, res)=>{
    const name = req.body.name;
    if(!name) return res.status(400).end();

    const isConflict = users.filter(user=>user.name === name).length
    if(isConflict) return res.status(409).end();

    const id = Date.now();
    const user = {id, name};
    users.push(user);
    res.status(201).json(user);
});

app.put('/users/:id', (req, res)=>{
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if(!name) return res.status(400).end();

    const user = users.filter(user=>user.id === id)[0];
    if(!user) return res.status(404).end();

    const isConflict = users.filter(user=>user.name === name).length;
    if(isConflict) return res.send(409).end();
    
    user.name = name;
    res.json(user);
});

app.listen(3000, function(){
    console.log('app listening on port 3000!');
});

module.exports = app;