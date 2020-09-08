const router = require('express').Router()
const namechange = require('./namechange');

router.get('/', (req, res) => {
    res.json({ "route-access": true });
})


// route to change names of the user accounts
router.use('username/', namechange);

module.exports = router;