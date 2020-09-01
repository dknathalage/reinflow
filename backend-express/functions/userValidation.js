const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const userValidation = Joi.object({
        name: Joi.string().max(32).required(),
        email: Joi.string().required().email(),
        pass: Joi.string().min(4).required()
    })
    return userValidation.validate(data)
}

const loginValidation = (data) => {
    const userValidation = Joi.object({
        email: Joi.string().required().email(),
        pass: Joi.string().min(4).required()
    })
    return userValidation.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
