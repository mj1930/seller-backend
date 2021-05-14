const Joi = require('@hapi/joi');

exports.filterOrders = () => {
    return Joi.object().keys({
        skip:  Joi.number().required().trim(),
        limit: Joi.number().required().trim(),
        status: Joi.string().required().trim()
    });
};

exports.listOrder = () => {
    return Joi.object().keys({
        skip:  Joi.number().required(),
        limit: Joi.number().required()
    });
};

exports.getOrderByDate = () => {
    return Joi.object().keys({
        startDate: Joi.string().required().trim(),
        endDate: Joi.string().required().trim()
    });
};

exports.updateOrder = () => {
    return Joi.object().keys({
        orderId: Joi.string().required().trim(),
        status: Joi.string().required().trim()
    });
};