const router = require('express').Router()


router.get('/', (req, res) => {
    res.json({ "route-access": true });
});

module.exports = router;
