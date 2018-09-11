var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var httpUtil = require('../utils/http');
var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

require('../routes/routes')(app);

app.use('/', router);

module.exports = app;
