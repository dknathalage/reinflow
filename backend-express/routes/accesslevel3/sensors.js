const router = require('express').Router();
const verify = require('../functions/verifyToken');
const Sensor = require('../model/sensor');
const { registerValidation } = require('../functions/sensorValidation');

router.get('/',
    async (req, res) => {
        try {
            const sensors = await Sensor.find({});
            return res.status(200).json({ status: true, sensors });
        } catch (err) {
            return res.status(400).json({
                status: false,
                error: err
            });
        }
    }
);

module.exports = router;