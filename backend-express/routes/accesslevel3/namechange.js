const router = require('express').Router();
const jwt = require('jsonwebtoken');
const users = require('../../model/user');

router.post('/', async (req, res) => {
    try {
        console.log("[TRIGGER]" + "NAME CHANGE")
        const data = req.body;
        const newUsername = data.new_username;
        console.log(newUsername)
        if (!newUsername) {
            return res.status(503).json({
                error: "Invalid Username Object"
            })
        } else {
            const token = req.header('Authorization');
            const verified = jwt.verify(token, process.env.SECRET_TOKEN)
            if (verified) {
                const user_id = verified._id;
                const user = await users.findOne({
                    _id: user_id
                });
                user.name = newUsername;
                user.save();
                return res.status(200).json({
                    status: true,
                    user: {
                        _id: user._id,
                        name: user.name
                    }
                })
            } else {
                return res.status(403).json({
                    error: "Invalid token"
                })
            }
        }
    } catch (error) {

    }
})

module.exports = router;