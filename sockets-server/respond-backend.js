const {
    getSensor1
} = require('./server.js');

var router = require('express').Router()


/** Endpoint that sends light data to backend */

router.get('/lights/:lightId', (req, res) => {
    res.json({
        lat: -37.84766,
        lon: 145.11486,
        status: Math.floor(Math.random() * Math.floor(max))
    })
});

router.get('/sensors/:sensorId', (req, res) => {
    res.json(getSensor1);
    console.log(getSensor1);
})

module.exports = router;