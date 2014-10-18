var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ioClient = require('socket.io-client');
app.use(express.static(__dirname + '/www' ) );


server.listen(8080);