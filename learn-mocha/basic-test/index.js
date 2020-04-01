var express = require('express');
var app = express();
var morgan = require('morgan');

var users = [
    {id: 1, name: 'tufu'},
    {id: 2, name: 'love'},
    {id: 3, name: 'hyemin'},
];
app.use(morgan('dev'));

app.get('/users', function(req, res){
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if(Number.isNaN(limit)){
        return res.status(400);
    }
    res.json(users.slice(0, limit));
});

app.listen(3000, function(){
    console.log('app listening on port 3000!');
});

module.exports = app;