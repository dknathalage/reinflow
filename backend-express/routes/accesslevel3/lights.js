const router = require('express').Router();
const Ligth = require('../../model/light')

router.get('/',
    async (req, res) => {
        try {
            const sensors = await Ligth.find({});
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