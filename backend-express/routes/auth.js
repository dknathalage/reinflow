const router = require('express').Router();
const User = require('../model/user')
const validation = require('../functions/userValidation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        pass: hashPassword,
        accessLevel: 3
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

    const token = jwt.sign({
        _id: user._id,
        access: user.accessLevel
    }, process.env.SECRET)
    return res.header('auth_token', token).status(200).json({
        username: user.name,
        access_level: user.accessLevel
    })
})

module.exports = router;