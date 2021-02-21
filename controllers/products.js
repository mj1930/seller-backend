const { all } = require('underscore');
const productSchema = require('../models/products/products');

const productValidator = require('../validators/products.validators');

module.exports = {

    addNewProduct: async (req, res, next) => {
        try {
            let {
                productId,
                itemName,
                countryOfOrigin,
                manufacturer,
                itemsNum,
                colorName,
                includedComponents,
                exclosureMaterial,
                itemTypeName,
                sizeMap,
                manufacturerContact,
                productDimensions,
                unitCount,
                unitCountType
            } = await productValidator.addProduct().validateAsync(req.body);
            let isProductPresent = await productSchema.countDocuments({ productId});
            if (isProductPresent) {
                return res.json({
                    code: 200,
                    data: {},
                    message: "product with same product id present already",
                    error: null
                });
            }
            const productData = await productSchema.save({
                productId,
                itemName,
                countryOfOrigin,
                manufacturer,
                itemsNum,
                colorName,
                includedComponents,
                exclosureMaterial,
                itemTypeName,
                sizeMap,
                manufacturerContact,
                productDimensions,
                unitCount,
                unitCountType
            });
            if (productData) {
                return res.json({
                    code: 200,
                    data: productData,
                    message: "product added successfully!!",
                    error: null
                });
            }
        } catch (err) {
            next(err);
        }
    },

    listAllProduct: async (req, res, next) => {
        try {
            let allProducts = await productSchema.find({
                isDeleted: false
            }).lean();
            return res.json({
                code: 200,
                data: allProducts,
                message: "all product fetched successfully!!",
                error: null
            });
        } catch (err) {
            next(err);
        }
    }
}