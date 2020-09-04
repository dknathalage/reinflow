const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const lightValidation = Joi.object({
        lightName: Joi.string().required(),
        lightDescription: Joi.string().required(),
        lon: Joi.number().required(),
        lat: Joi.number().required()
    })
    return lightValidation.validate(data)
}

module.exports.registerValidation = registerValidation;