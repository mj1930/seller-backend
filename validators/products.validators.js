const Joi = require("@hapi/joi");

exports.addProduct = () => {
    return Joi.object().keys({
        barcode: Joi.string().required().trim(),
        itemName: Joi.string().required().trim(),
        city: Joi.string().required().trim(),
        countryOfOrigin: Joi.string().required().trim(),
        brand: Joi.string().required().trim(),
        dimensions: Joi.object().required(),
        weight: Joi.string().required().trim(),
        categoryId: Joi.string().required().trim(),
        subCategoryId: Joi.string().required().trim(),
        availableUnits: Joi.number().required()
    });
};

exports.addVariation = () => {
    return Joi.object().keys({
        color: Joi.array().required(),
        size: Joi.array().required(),
        id: Joi.string().required().trim()
    });
};

exports.addProductSellingInfo = () => {
    return Joi.object().keys({
        productPrice: Joi.string().required().trim(),
        unitCount: Joi.number().required(),
        mrp: Joi.string().required().trim(),
        id: Joi.string().required().trim()
    })
};

exports.addProductsDesc = () => {
    return Joi.object().keys({
        description: Joi.string().required().trim(),
        heading: Joi.string().required().trim(),
        id: Joi.string().required().trim()
    });
};

exports.searchProduct = () => {
    return Joi.object().keys({
        term: Joi.string().required().trim()
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
};

exports.getProductDetails = () => {
    return Joi.object().keys({
        productId: Joi.string().required().trim()
    })
}

exports.addProductNew = () => {
    return Joi.object().keys({
        barcode: Joi.string().required().trim(),
        hsn: Joi.string().required().trim(),
        model: Joi.string().required().allow('').trim(),
        itemName: Joi.string().required().trim(),
        city: Joi.string().required().trim(),
        countryOfOrigin: Joi.string().required().trim(),
        brand: Joi.string().required().trim(),
        dimensions: Joi.object().required(),
        weight: Joi.string().required().trim(),
        categoryId: Joi.string().required().trim(),
        subCategoryId: Joi.string().required().trim(),
        color: Joi.array().optional().allow(''),
        size: Joi.array().optional().allow(''),
        productImage: Joi.array().optional().allow(''),
        productPrice: Joi.string().optional().allow('').trim(),
        mrp: Joi.string().optional().allow('').trim(),
        description: Joi.string().optional().allow('').trim(),
        heading: Joi.string().optional().allow('').trim(),
        availableUnits: Joi.number().required()
    });
}