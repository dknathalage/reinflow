const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const sensorValidation = Joi.object({
        sensorName: Joi.string().required(),
        sensorDescription: Joi.string().required(),
        lon: Joi.number().required(),
        lat: Joi.number().required()
    })
    return sensorValidation.validate(data)
}

module.exports.registerValidation = registerValidation;