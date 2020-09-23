const router = require('express').Router()
const users = require('./userinfo');

router.get('/', (req, res) => {
    res.json({ "route-access": true });
});

router.use('/users', users);

module.exports = router;
