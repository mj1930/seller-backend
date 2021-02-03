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

exports.addSellerDetails = () => {
    return Joi.object().keys({
        name: Joi.string().required().trim(),
        address: Joi.object().required(),
        hasGST: Joi.boolean().optional(),
        taxState: Joi.string().optional().trim(),
        gstin: Joi.string().optional().trim(),
        pan: Joi.string().required().trim(),
        accountNumber: Joi.string().required(),
        accountName: Joi.string().required().trim(),
        ifscCode: Joi.string().required().trim(),
        storename: Joi.string().required().trim()
    })
}