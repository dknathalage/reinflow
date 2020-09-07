const router = require('express').Router()


router.get('/', (req, res) => {
    res.send('success 3');
})

module.exports = router;