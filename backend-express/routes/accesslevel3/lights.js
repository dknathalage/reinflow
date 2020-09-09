const router = require('express').Router();
const Light = require('../../model/light')

router.get('/',
    async (req, res) => {
        try {
            const lights = await Light.find({})
            return res.status(200).send(lights)
        } catch (err) {
            return res.status(400).send(err)
        }
    }
)

module.exports = router;