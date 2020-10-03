const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../../functions/verifyToken');
const users = require('../../model/user');
const bcrypt = require('bcryptjs')



/** 
* @api { post } /USER MANAGEMENT
* @apiGroup Auth
* @apiSuccess {String} title Auth title
* @apiSuccess {Boolean} done=false Auth is done?
* @apiSuccess {Date} updated_at Update date
* @apiSuccess {Date} created_at Register date
* @apiSuccessExample { json } Success - Response:
*{
*  "id": "5f4dfad37b549140a0513c63",
*  }
*}
* @apiErrorExample { json } Error - Response:
* {
*     "Error 400: Bad Request"
* } 
*/
router.post('/password/:newpassword/:token', async (req, res) => {
    const new_pass = req.params.newpassword;
    const token = req.params.token;
    if (new_pass) {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        if (verified) {
            const user_id = verified._id;
            const user = await users.findOne({
                _id: user_id
            })
            if (user) {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(req.body.pass, salt)
                user.pass = hashPassword;
                user.save();

                res.status(200).json({
                    status: true,
                    message: "PasswordUpdated"
                })
            } else {
                res.status(404).json({
                    status: false,
                    message: "UserNotFoundError"
                })
            }

        } else {
            res.status(404).json({
                status: false,
                message: "InvalidTokenError"
            })
        }
    }
})

module.exports = router;