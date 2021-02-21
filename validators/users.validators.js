const Joi = require("@hapi/joi");

exports.login = () => {
    return Joi.object().keys({
        email: Joi.string().required().trim(),
        password: Joi.string().required().trim()
    });
};

exports.signup = () => {
    return Joi.object().keys({
        name: Joi.string().required().trim(),
        mobile: Joi.string().length(10).required().trim(),
        password: Joi.string().required().trim(),
        email: Joi.string().email().required().trim()
    });
};

exports.listAllUsers = () => {
    return Joi.object().keys({
        skip: Joi.number().required(),
        limit: Joi.number().required()
    });
}

