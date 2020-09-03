var express = require('express')();
var server = require('http').Server(express);
var backendRoute = require('./respond-backend')

const io = require('socket.io')(server, {
    pingInterval: 10000,
    pingTimeout: 5000
});
const PORT = 5001;

var sensors = [];
var sensor_1_data = [];

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
        const payload = {
            lon: data.payload.lon,
            lat: data.payload.lat,
            data_collection: data.payload.data_set_collection
        }
        sensor_1_data.push(payload);
    })
})
/**
 * express route 
 */

express.get('/device-data-1/sensors/:sensorId', (req, res) => {
    var sensorId = req.params.sensorId;
    console.log(sensorId)
    if (sensorId === "1") {
        res.json(sensor_1_data);
        console.log("OTHER", sensor_1_data);
    } else {
        res.json({
            message: "not yet implemented"
        })
    }

})

module.exports = sensor_1_data;