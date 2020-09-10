const router = require('express').Router();
const Light = require('../../model/light');
const Sensor = require('../../model/sensor');
//api/l2/info/sensors
router.post('/lights', async (req, res) => {
    try {
        const lights = await Light.find({})
        res.status(200).json({
            status: true,
            lights
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: false,
            error: err.message
        })
    }
})


router.post('/sensors', async (req, res) => {
    try {
        const sensors = await Sensor.find({})
        res.status(200).json({
            status: true,
            sensors
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: false,
            error: err.message
        })
    }
})


module.exports = router;