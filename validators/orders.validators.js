const Joi = require('@hapi/joi');

exports.filterOrders = () => {
    return Joi.object().keys({
        skip:  Joi.number().required(),
        limit: Joi.number().required(),
        search: Joi.string().required().trim(),
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

exports.sortOrder = () => {
    return Joi.object().keys({
        key: Joi.string().required().trim(),
        sortBy: Joi.number().required(),
        skip: Joi.number().required(),
        limit: Joi.number().required()
    });
};

exports.searchOrders = () => {
    return Joi.object().keys({
        skip:  Joi.number().required(),
        limit: Joi.number().required(),
        search: Joi.string().required().trim(),
        status: Joi.string().optional().allow('').trim()
    });
};

exports.searchOrdersById = () => {
    return Joi.object().keys({
        skip:  Joi.number().required(),
        limit: Joi.number().required(),
        orderId: Joi.string().required().trim(),
        search: Joi.string().optional().allow('').trim(),
        status: Joi.string().optional().allow('').trim()
    });
};