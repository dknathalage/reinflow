require('dotenv').config()
const {
    getSensor1
} = require('./server.js');
const {
    default: Axios
} = require('axios');

var router = require('express').Router()

// light data storage
var lightData = {}

/** 
 * @api { get } /lights This routes "fetches" data from lights and send to backend.
 * @apiGroup Device
 * @apiSuccessExample { json } Success - Response:
 * data: lightData
 */
router.get('/lights', async (req, res) => {
    if (Object.keys(lightData) == 0) {
        console.log("Fetching...")
        const lights = await Axios.get(`${process.env.BACKEND_URL}/api/l3/lights`, { headers: { Authorization: req.header('Authorization') } })
        console.log("Fetch complete...")
        lightData = lights.data.sensors
        for (var i = 0; i < lightData.length; i++) {
            lightData[i] = { ...lightData[i], status: 2, control:"auto" }
        }
    }
    res.json({
        data: lightData
    })
});


function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }


async function changeToRed(arrayId) {
    if (lightData[arrayId].status != 0) {
        lightData[arrayId].status = 1
        await sleep(5000)
        lightData[arrayId].status = 0
    }
}

function changeToGreen(arrayId) {
    if (lightData[arrayId].status != 2) {
        lightData[arrayId].status = 0
    }
}

// setting light status manually
router.get('/lights/:id/:status', (req, res) => {
    console.log(req.params)
    const {
        id,
        status
    } = req.params;
    if (Object.keys(lightData).length == 0) return res.status(400).json({
        message: "No traffic light items to update"
    })
    for (var i = 0; i < lightData.length; i++) {
        if (id === lightData[i]._id) {
            status == 0 ? changeToRed(i) : changeToGreen(i)
            //console.log('changed')
            return res.json({
                message: "change light signal sent"
            })
        }
    }
    return res.status(400).json({
        message: "light not found"
    }) // if the light with given id is not found
})

async function changeToGreenAll() {
    setTimeout(async () => { //execute in 5 seconds
        lightData.forEach(light, async light => {
            light.status = 2
        });
    }, 5000);

    setTimeout(async () => { //exec in 5 second ==> change to green
        lightData.forEach(light, async light => {
            light.status = 1;
        })
    }, 5000);
}

async function changeToRedAll() {
    setTimeout(async () => { //execute in 5 seconds
        lightData.forEach(light, async light => {
            light.status = 2
        });
    }, 5000);

    setTimeout(async () => { //exec in 5 second ==> change to green
        lightData.forEach(light, async light => {
            light.status = 0;
        })
    }, 5000);
}

// //route update -> /all
router.get('/lights/all/:status', (req, res) => {
    const status = req.params.status;
    if (!status) {
        res.status(404).send({
            status: false,
            message: "No status Found."
        })
    } else {
        if (status === '1' || status === 1) { //green handler
            changeToGreenAll();
        } else if (status === '0' || status === 0) {
            changeToRedAll();
        }

    }
})

//get all traffic light data
router.post('/lights/all/', (req, res) => {
    res.status(200).json(lightData);
})






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