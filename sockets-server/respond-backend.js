require('dotenv').config()
const { getSensor1 } = require('./server.js');
const { default: Axios } = require('axios');

var router = require('express').Router()


/** 
* @api { get } /lights This routes "fetches" data from lights and send to backend.
* @apiGroup Device
* @apiSuccessExample { json } Success - Response:
* data: lightData
*/
router.get('/lights', async (req, res) => {
    console.log("Fetching...")
    const lights = await Axios.get(`${process.env.BACKEND_URL}/api/l3/lights`, { headers: { Authorization: req.header('Authorization') } })
    console.log("Fetch complete...")
    var lightData = lights.data.sensors
    for (var i = 0; i < lightData.length; i++) {
        lightData[i] = { ...lightData[i], status: Math.floor(Math.random() * Math.floor(3)) }
    }
    res.json({
        data: lightData
    })
});

/** 
* @api { get } /sensors/:sensorId Return Sensor 1
* @apiGroup Device
* @apiSuccessExample { json } Success - Response:
*{
*  "Light_Name": "null",
*  "Light_Description": "null",
*  "Location": {
*    "lon": "null",
*    "lat": "null"
*  }
*}
*/
router.get('/sensors/:sensorId', (req, res) => {
    res.json(getSensor1);
    console.log(getSensor1);
})

module.exports = router;