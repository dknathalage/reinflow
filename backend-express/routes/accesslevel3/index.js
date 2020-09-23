const router = require('express').Router();
const namechange = require('./namechange');
const lights = require('./lights');
const sensors = require('./sensors');
const realtime = require('./realtime');

router.get('/', (req, res) => {
    res.json({ "route-access": true });
})

// route to change names of the user accounts
router.use('/username', namechange);
router.use('/lights', lights);
router.use('/sensors', sensors);
router.use('/realtime', realtime)

module.exports = router;