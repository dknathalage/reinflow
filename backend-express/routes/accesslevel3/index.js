const router = require('express').Router()
const namechange = require('./namechange');
const lights = require('./lights');

router.get('/', (req, res) => {
    res.json({ "route-access": true });
})


// route to change names of the user accounts
router.use('username/', namechange);
router.use('lights/', lights);

module.exports = router;