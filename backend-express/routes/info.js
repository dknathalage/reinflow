const router = require('express').Router();
const verify = require('../functions/verifyToken');
const users = require('../model/user');
const Sensor = require('../model/sensor');
const Light = require('../model/light');

//nned to implement a looger 
console.log("RUNNING INFO ROUTE")

router.post('/users', (req, res, next) => verify(req, res, next, 3), async (req, res) => {
    try {
        const allUsers = await users.find({});
        return res.status(200).json({
            status: true,
            message: "All Users in the system",
            users: allUsers
        })
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: error.message
        })
    }
})

router.post('/sensors', (req, res, next) => verify(req, res, next, 3), async (req, res) => {
    try {
        const sensors = await Sensor.find({});
        res.status(200).json({
            status: true,
            sensors: sensors
        })
    } catch (error) {
        console.log(error)
        res.send(404).json({
            status: false,
            error
        })
    }

});

router.post('/lights', (req, res, next) => verify(req, res, next, 3), async (req, res) => {
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
            error: err
        })
    }
})



module.exports = router;