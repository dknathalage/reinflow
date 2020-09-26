const router = require('express').Router();
const jwt = require('jsonwebtoken');
const users = require('../../model/user');

/** 
* @api { post } /chnage the name of an exsiting user
* @apiGroup nammechange
* @apiSuccessExample { json } Success - Response:
*{
*  "name": "John",
*  "id": "5f4dfad37b549140a0513c63",
*  
*  }
*}
* @apiErrorExample { json } Error - Response:
* {
*     "Error 400: Bad Request"
* } 
*/




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