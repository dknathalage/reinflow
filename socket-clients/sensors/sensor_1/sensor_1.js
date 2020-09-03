const io = require('socket.io-client')

const socket = io('http://localhost:5001/sensors');

socket.on('connect', () => {
    console.log("Connected with the server")

    socket.emit('ack-conn', {
        name: "sensor1",
        payload: "sensor1 payload"
    })


    setInterval(() => {
        console.log("sending-payload to server")
        socket.emit('sensor-1-data-payload', {
            payload: {
                lon: Math.round((Math.random() * 360 - 180) * 1000) / 1000,
                lat: Math.round((Math.random() * 360 - 180) * 1000) / 1000,
                data_1: Math.round((Math.random() * 360 - 180) * 1000) / 1000,
                data_set_collection: {
                    data: "something inside here",
                    data_label_here: "Some more data here",
                    data_arr: []
                }
            }
        })
    }, 5000); //emmits every 5 seconds

})