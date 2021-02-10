const Joi = require("@hapi/joi");

exports.sendEmailVerification = () => {
    return Joi.object().keys({
        mobileNum: Joi.string().length(10).required().trim()
    });
};