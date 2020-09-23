const router = require('express').Router();
const Sensor = require('../../model/light')

router.get('/',
    async (req, res) => {
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
    }
)

module.exports = router;