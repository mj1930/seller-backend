const Joi = require('@hapi/joi');

exports.addOrder = () => {
    return Joi.object().keys({
        mode: Joi.string().required().trim(),
        products: Joi.object().required(),
        userId: Joi.string().required().trim(),
        totalAmnt: Joi.string().required().trim(),
        address: Joi.object().required(),
        userGstin: Joi.string().optional(),
        businessName: Joi.string().optional(),
        paymentMode:  Joi.string().required().trim(),
    });
};

exports.filterOrders = () => {
    return Joi.object().keys({
        skip:  Joi.string().required().trim(),
        limit: Joi.string().required().trim(),
        status: Joi.string().required().trim()
    });
};