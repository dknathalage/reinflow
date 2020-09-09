const router = require('express').Router();
const users = require('../../model/user')

router.post('/users', async (req, res) => {
    try {
        const allUsers = await users.find({});
        return res.status(200).json(allUsers)
    } catch (error) {

    }
})

router.post('')

module.exports = router