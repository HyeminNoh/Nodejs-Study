var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var user  = require('./api/user');

if(process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', user);

module.exports = app;