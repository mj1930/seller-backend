const Joi = require("@hapi/joi");

exports.login = () => {
    return Joi.object().keys({
        email: Joi.string().required().trim(),
        password: Joi.string().required().trim()
    });
};

exports.signup = () => {
    return Joi.object().keys({
        mobile: Joi.string().length(10).required().trim(),
        password: Joi.string().length(10).required().trim(),
        name: Joi.string().required().trim(),
        email: Joi.string().email().required().trim(),
        address: Joi.object().required().trim(),
        hasGST: Joi.boolean().optional().trim(),
        taxState: Joi.string().optional().trim(),
        gstin: Joi.string().optional().trim(),
        pan: Joi.string().required().trim(),
        accountNumber: Joi.string().required().trim(),
        accountName: Joi.string().required().trim(),
        ifscCode: Joi.string().required().trim(),
        storename: Joi.string().required().trim()
    });
};