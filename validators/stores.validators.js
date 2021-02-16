const Joi = require("@hapi/joi");

exports.verifyUsername = () => {
    return Joi.object().keys({
        storename: Joi.string().required().trim()
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