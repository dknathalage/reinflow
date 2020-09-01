const router = require('express').Router();
const User = require('../model/user')
const validation = require('../functions/userValidation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const {error} = validation.registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send("email already exists")

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.pass, salt)

    const user = new User({
        name: req.body.name,
        email:req.body.email,
        pass: hashPassword,
        accessLevel: 3
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/login', async (req, res) => {
    const {error} = validation.loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send("email doesn't exist")

    const validPass = await bcrypt.compare(req.body.pass, user.pass)
    if(!validPass) return res.status(400).send("invalid username or password")

    const token = jwt.sign({_id: user._id, access: user.accessLevel}, process.env.SECRET_TOKEN)
    return res.header('auth-token', token).status(200).send(token)
})

module.exports = router;