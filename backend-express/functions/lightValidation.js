const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const lightValidation = Joi.object({
        lon: Joi.number().required(),
        lat: Joi.number().required()
    })
    return lightValidation.validate(data)
}

module.exports.registerValidation = registerValidation;