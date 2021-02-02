const Joi = require("@hapi/joi");

exports.verifyUsername = () => {
    return Joi.object().keys({
        storename: Joi.string().required().trim()
    });
};