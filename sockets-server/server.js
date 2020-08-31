var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

const PORT = 5000;

server.listen(PORT, () => {
    console.log("Started on " + PORT)
});

app.get('/', function (req, res) {
    res.json({
        status: "LIVE",
        clients: []
    })
});

io.on('connection', function (socket) {
    console.log(`New endpoint connected to server. ${socket.id}`);
    //on connect
    socket.emit('welcome', {
        res: "Connection Acknowledged!"
    })

    //TODO: custom events when sensors are added.
});