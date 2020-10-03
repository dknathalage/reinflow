const router = require('express').Router()
const infoRoute = require('./info');
const userManage = require('./userinfo');

router.use('/info', infoRoute);
router.use('/manage', userManage)

router.get('/', (req, res) => {
    res.json({
        "route-access": true
    });
});


module.exports = router;