const router = require('express').Router();
const verify = require('../../functions/verifyToken');
const users = require('../../model/user');

router.post('/users', (req, res, next) => verify(req, res, next, 3), async (req, res) => {
    try {
        const allUsers = await users.find({});
        return res.status(200).json({
            status: true,
            message: "All Users in the system",
            users: allUsers
        })
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: error.message
        })
    }
})



module.exports = router;