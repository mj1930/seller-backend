const Joi = require("@hapi/joi");

exports.verifyUsername = () => {
    return Joi.object().keys({
        storename: Joi.string().required().trim()
    });
};

exports.addSellerAddressDetails = () => {
    return Joi.object().keys({
        storename: Joi.string().required().trim(),
        address: Joi.object().required()
    });
};

exports.addSellerBankDetails = () => {
    return Joi.object().keys({
        accountNumber: Joi.string().required(),
        accountName: Joi.string().required().trim(),
        ifscCode: Joi.string().required().trim()
    });
};

exports.addSellerGstDetails = () => {
    return Joi.object().keys({
        name: Joi.string().required().trim(),
        hasGST: Joi.boolean().optional(),
        taxState: Joi.string().optional().trim(),
        gstin: Joi.string().optional().trim(),
        pan: Joi.string().required().trim()
    })
}