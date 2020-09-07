const router = require('express').Router()


router.get('/', (req, res) => {
    res.send('success 2');
})

module.exports = router;
