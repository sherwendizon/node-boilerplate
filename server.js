var express = require("express");
var request = require("request");
var http = require("http");
var https = require("https");
var cors = require('cors');
var server_root = "/database_master-service";

var app = require("./app/app");
var base = express();
base.use(cors());
base.use(server_root, app);
http.createServer(base).listen(3000);
console.log('Connected to server port: ' +3000);
