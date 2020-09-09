const router = require('express').Router();
const verify = require('../functions/verifyToken')
const users = require('../model/user')
const jwt = require('jsonwebtoken');


/**
 * This route is deprecated
 * 
 * 
 * Change frontend requests pointing to this route to 
 * 'accesslevel1/' route
 * 
 * all the Toplevel administration routes are handled in
 * the respective subdir
 * 
 * 
 * refer accesslevel1/index.js for more details.
 */

 /** DEPRECATED */
////// THIS ENDPOINT CAN BE FOUND IN accesslevel1/username
////// TOPLEVEL USERS CAN ACCESS THESE LOWLEVEL ENPOINTS TOO.

router.post('/username', (req, res, next) => verify(req, res, next, 3), async (req, res) => {
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

/** DEPRECATED */
/// THIS ENDPOINT CAN ONLY BE ACCESSED BY THE ADMIN USERS (LEVEL1) AND CAN BE FOUND IN RESPECTIVE ENDPOINT DIRECTORIES

router.post('/users', (req, res, next) => verify(req, res, next, 3), async (req, res) => {
    try {
        const allUsers = await users.find({});
        return res.status(200).json(allUsers)
    } catch (error) {

    }
})


module.exports = router