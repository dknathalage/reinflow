var express = require('express')();
var server = require('http').Server(express);
var backendRoute = require('./respond-backend')
const io = require('socket.io')(server, {
    pingInterval: 10000,
    pingTimeout: 5000
});
const PORT = 5001;

var sensors = [];

server.listen(PORT, () => {
    console.log("Started on " + PORT)
});

express.get('/', function (req, res) {
    res.json({
        status: "LIVE",
        clients: sensors
    })
});
//sensors
const sensorIO = io.of("/sensors");

express.use('/device-data', backendRoute);

sensorIO.on('connection', socket => {
    console.log("New sensor Connected with id : ", socket.conn.id)
    socket.on('ack-conn', function (data) {
        const details = {
            id: socket.conn.id
        }
        sensors.push(details)
        console.log(data);
    })
    socket.on('disconnect', () => {
        console.log("Sensor Disconnected", socket.conn.id)
    })

    socket.on('sensor-1-data-payload', function (data) { //hook to handle sensor 1 payload
        console.log(data);
    })
})