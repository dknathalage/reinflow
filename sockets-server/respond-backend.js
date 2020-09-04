const {
    getSensor1
} = require('./server.js');

var router = require('express').Router()


/** Endpoint that sends light data to backend */

router.get('/lights', (req, res) => {
    console.log("called")
    res.json({
        lat: -37.84975,
        lon: 145.10907,
        status: Math.floor(Math.random() * Math.floor(3))
    })
});

router.get('/sensors/:sensorId', (req, res) => {
    res.json(getSensor1);
    console.log(getSensor1);
})

module.exports = router;