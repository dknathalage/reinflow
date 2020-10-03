const router = require('express').Router()
const infoRoute = require('./info');
const manageSensors = require('./managesensors')
router.use('/info', infoRoute);
router.use('/set/sensors', manageSensors)
router.get('/', (req, res) => {
    res.json({
        "route-access": true
    });
})





module.exports = router;