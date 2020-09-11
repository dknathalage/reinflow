const router = require('express').Router()
const infoRoute = require('./info');

router.use('/info', infoRoute);

router.get('/', (req, res) => {
    res.json({
        "route-access": true
    });
})





module.exports = router;