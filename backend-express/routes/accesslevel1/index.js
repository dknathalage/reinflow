const router = require('express').Router()


router.get('/', (req, res) => {
    res.send('success 1');
});

module.exports = router;
