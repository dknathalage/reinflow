const router = require('express').Router();
const User = require('../model/user')
const validation = require('../functions/userValidation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()


/** 
* @api { post } /register Register new user to database
* @apiGroup Auth
* @apiSuccessExample { json } Success - Response:
*{
*  "name": "John",
*  "email": "john_doe@email.com",
*  "pass": "pass",
*  "accessLevel": "3",
*  }
*}
* @apiErrorExample { json } Error - Response:
* {
*     "Error 400: Bad Request"
* } 
*/
router.post('/register', async (req, res) => {
    console.log(req.body);
    const {
        error
    } = validation.registerValidation(req.body)
    if (error) return res.status(400).json({
        error: error.details[0].message
    })

    const emailExists = await User.findOne({
        email: req.body.email
    })
    if (emailExists) return res.status(403).json({
        message: "Email Already Exists"
    })

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.pass, salt)
    const accesslvl = req.body.al === undefined ? 3 : req.body.al;
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        pass: hashPassword,
        accessLevel: accesslvl
    })
    try {
        const savedUser = await user.save()
        res.status(200).json({
            message: "User Registered!",
            details: savedUser
        })
    } catch (err) {
        res.status(400).json({
            error: err
        });
    }
})


/** 
* @api { post } /login Return Sensor information for a specific sensor ID
* @apiGroup Auth
* @apiSuccessExample { json } Success - Response:
*{
*  "token": "Authorisation Token",
*  "username": "john",
*  "access_level": "3",
*  "id": "5f4dfad37b549140a0513c63",
*  }
*}
* @apiErrorExample { json } Error - Response:
* {
*     "Error 400: Bad Request"
* } 
*/
router.post('/login', async (req, res) => {
    const {
        error
    } = validation.loginValidation(req.body)
    if (error) return res.status(403).send(error.details[0].message)

    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) return res.status(403).json({
        message: "Invalid Email"
    })

    const validPass = await bcrypt.compare(req.body.pass, user.pass)
    if (!validPass) return res.status(403).json({
        message: "Invalid Password"
    })

    const token = await jwt.sign({
        _id: user._id,
        access: user.accessLevel
    }, process.env.SECRET_TOKEN)
    return res.header('auth_token', token).status(200).json({
        token: token,
        username: user.name,
        access_level: user.accessLevel,
        id: user._id
    })
})


router.get('/remove/:id', async (req, res) => {
    const removed = await User.findByIdAndDelete(req.params.id);
    res.send(removed);
})


module.exports = router;