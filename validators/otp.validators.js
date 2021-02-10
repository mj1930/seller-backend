const Joi = require("@hapi/joi");

exports.sendOtp = () => {
    return Joi.object().keys({
        mobileNum: Joi.string().length(10).required().trim()
    });
};

exports.verifyOtp = () => {
    return Joi.object().keys({
        mobileNum: Joi.string().length(10).required().trim(),
        otp: Joi.string().length(6).required().trim()
    });
};