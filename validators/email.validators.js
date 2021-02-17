const Joi = require("@hapi/joi");

exports.sendEmailVerification = () => {
    return Joi.object().keys({
        email: Joi.string().required().trim()
    });
};