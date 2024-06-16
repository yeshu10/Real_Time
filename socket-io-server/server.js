"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socket_io_1 = require("socket.io");
var app = express();
var server = http.createServer(app);
var io = new socket_io_1.Server(server);
var PORT = process.env.PORT || 5000;
// Define a basic route handler for the root endpoint
app.get('/', function (req, res) {
    res.send('Server is up and running!');
});
io.on('connection', function (socket) {
    console.log('A user connected');
    socket.on('drawing', function (data) {
        // Handle drawing event
        socket.broadcast.emit('drawing', data); // Broadcast drawing data to other clients
    });
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
});
server.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
