const router = require('express').Router();
const Sensor = require('../../model/sensor');

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