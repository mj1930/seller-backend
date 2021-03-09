const Joi = require("@hapi/joi");

exports.addProduct = () => {
    return Joi.object().keys({
        productId: Joi.string().required().trim(),
        itemName: Joi.string().required().trim(),
        countryOfOrigin: Joi.string().required().trim(),
        manufacturer: Joi.string().required().trim(),
        itemsNum: Joi.number().required(),
        colorName: Joi.string().required().trim(),
        includedComponents: Joi.string().required().trim(),
        exclosureMaterial: Joi.string().required().trim(),
        itemTypeName: Joi.string().required().trim(),
        sizeMap: Joi.string().required().trim(),
        manufacturerContact: Joi.string().required().trim(),
        productDimensions:Joi.object().required(),
        unitCount: Joi.number().required(),
        unitCountType: Joi.number().required()
    });
};

exports.listAllProducts = () => {
    return Joi.object().keys({
        skip: Joi.number().required(),
        limit: Joi.number().required()
    });
}

exports.filterProducts = () => {
    return Joi.object().keys({
        skip: Joi.number().required(),
        limit: Joi.number().required(),
        status: Joi.boolean().required()
    });
}