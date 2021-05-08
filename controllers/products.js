const productSchema = require('../models/products/products');

const productValidator = require('../validators/products.validators');
const _ = require('underscore');

module.exports = {

    addNewProduct: async (req, res, next) => {
        try {
            let {
                barcode, itemName, city, countryOfOrigin,
                brand, availableUnits, dimensions,
                weight, categoryId, subCategoryId
            } = await productValidator.addProduct().validateAsync(req.body);
            let userId = req.decoded._id;
            let isProductPresent = await productSchema.countDocuments({ itemName});
            if (isProductPresent) {
                return res.json({
                    code: 200,
                    data: {},
                    message: "product with same product id present already",
                    error: null
                });
            }
            const productData = await productSchema.create({
                barcode,
                userId,
                itemName,
                city,
                countryOfOrigin,
                availableUnits,
                dimensions,
                brand,
                weight,
                categoryId,
                subCategoryId
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

    addProductVariation: async (req, res, next) => {
        try {
            let {
                color,
                size,
                id
            } = await productValidator.addVariation().validateAsync(req.body);
            let isProductPresent = await productSchema.countDocuments({ _id: id});
            if (!isProductPresent) {
                return res.json({
                    code: 200,
                    data: {},
                    message: "product with same product id present already",
                    error: null
                });
            }
            const productData = await productSchema.findOneAndUpdate({
                _id: id
            },
            { 
                $set: {
                    color,
                    size
                }
            }, {new: true});
            if (productData) {
                return res.json({
                    code: 200,
                    data: productData,
                    message: "product details added successfully!!",
                    error: null
                });
            }
        } catch (err) {
            next(err);
        }
    },

    addProductSellingInfo: async (req, res, next) => {
        try {
            let {
                productPrice,
                unitCount,
                mrp,
                id
            } = await productValidator.addProductSellingInfo().validateAsync(req.body);
            let isProductPresent = await productSchema.countDocuments({ _id: id});
            if (!isProductPresent) {
                return res.json({
                    code: 200,
                    data: {},
                    message: "No product to update",
                    error: null
                });
            }
            const productData = await productSchema.findOneAndUpdate({
                _id: id
            },
            { 
                $set: {
                    productPrice,
                    unitCount,
                    mrp
                }
            }, {new: true});
            if (productData) {
                return res.json({
                    code: 200,
                    data: productData,
                    message: "product details added successfully!!",
                    error: null
                });
            }
        } catch (err) {
            next(err);
        }
    },

    addProductDesc: async (req, res, next) => {
        try {
            let {
                description,
                heading,
                id
            } = await productValidator.addProductsDesc().validateAsync(req.body);
            let isProductPresent = await productSchema.countDocuments({ _id: id});
            if (!isProductPresent) {
                return res.json({
                    code: 200,
                    data: {},
                    message: "No product to update",
                    error: null
                });
            }
            const productData = await productSchema.findOneAndUpdate({
                _id: id
            },
            { 
                $set: {
                    description,
                    heading
                }
            }, {new: true});
            if (productData) {
                return res.json({
                    code: 200,
                    data: productData,
                    message: "product details added successfully!!",
                    error: null
                });
            }
        } catch (err) {
            next(err);
        }
    },

    addProductImages: async (req, res, next) => {
        try {
            let files = req.files ? _.pluck(req.files, 'location') : [];
            let id = req.body.productId;
            let imagesData = await productSchema.findOneAndUpdate({
                _id: id
            }, {
                $set: {
                    productImg: files
                }
            }, {new: true});
            return res.json({
                code: 200,
                data: imagesData,
                message: "Images added successfully",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    listAllProduct: async (req, res, next) => {
        try {
            let userId = req.decoded._id;
            let allProducts = [];
            let { skip, limit } = await productValidator.listAllProducts().validateAsync(req.body);
            allProducts = await productSchema.find({
                $and: [
                    {
                        userId
                    },
                    {
                        isDeleted: false
                    }
                ]
            })
            .sort({ createdAt: -1})
            .skip(skip)
            .limit(limit)
            .lean();
            return res.json({
                code: 200,
                data: allProducts,
                message: "all product fetched successfully!!",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    listAllProductAdmin: async (req, res, next) => {
        try {
            let allProducts = await productSchema.find({
                isDeleted: false
            }).sort({
                createdAt: -1
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
    },

    filterProducts: async (req, res, next) => {
        try {
            let allProducts = [];
            let { skip, limit, status } = await productValidator.filterProducts().validateAsync(req.body);
            allProducts = await productSchema.find({
                isDeleted: false,
                isApproved: status
            })
            .skip(skip)
            .limit(limit)
            .lean();
            return res.json({
                code: 200,
                data: allProducts,
                message: "all product fetched successfully!!",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    searchFromProducts: async (req, res, next) => {
        try {
            let { term } = await productValidator.searchProduct().validateAsync(req.query);
            let searchedProducts = await productSchema.find({
                $or: [
                    {itemName: { $regex: new RegExp(term, 'i') }},
                    { barcode:  { $regex: new RegExp(term, 'i') }}
                ]
            }).lean();
            if (searchedProducts && searchedProducts.length > 0) {
                return res.json({
                    code: 200,
                    data: searchedProducts,
                    message: "all product fetched successfully!!",
                    error: null
                });
            } else {
                return res.json({
                    code: 400,
                    data: {},
                    message: "No products found !!",
                    error: null
                });
            }
        } catch (err) {
            next(err);
        }
    },

    getProductDetails: async (req, res, next) => {
        try {
            let { productId } = await productValidator.getProductDetails().validateAsync(req.params);
            let productData = await productSchema.findOne({
                _id: productId
            }).lean();
            return res.json({
                code: 200,
                data: productData,
                message: "Product data found",
                error: null
            });
        } catch(err) {
            next(err);
        }
    },

    addProductNew: async (req, res, next) => {
        try {
            let {
                barcode, itemName, city, countryOfOrigin,
                brand, availableUnits, dimensions,
                weight, categoryId, subCategoryId, color,
                size, productPrice, mrp, description,
                heading, hsn, model
            } = await productValidator.addProductNew().validateAsync(req.body);
            let userId = req.decoded._id;
            let isProductPresent = await productSchema.countDocuments({_id: userId, itemName, barcode});
            if (isProductPresent) {
                return res.json({
                    code: 200,
                    data: {},
                    message: "product with details already present!!!",
                    error: null
                });
            }
            const productData = await productSchema.create({
                barcode,
                userId,
                hsn,
                model,
                itemName,
                city,
                countryOfOrigin,
                availableUnits,
                dimensions,
                brand,
                weight,
                categoryId,
                subCategoryId,
                color,
                size,
                productPrice,
                mrp,
                description,
                heading
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

    editProductNew: async (req, res, next) => {
        try {
            let {
                productId, barcode, itemName, city, countryOfOrigin,
                brand, availableUnits, dimensions,
                weight, categoryId, subCategoryId, color,
                size, productPrice, mrp, description,
                heading, hsn, model
            } = await productValidator.editProductNew().validateAsync(req.body);
            let userId = req.decoded._id;
            let isProductPresent = await productSchema.countDocuments({_id: userId, itemName, barcode});
            if (isProductPresent) {
                return res.json({
                    code: 200,
                    data: {},
                    message: "product with details already present!!!",
                    error: null
                });
            }
            const productData = await productSchema.findOneAndUpdate({
                _id: productId
            },
            {
                $set: {
                    barcode,
                    userId,
                    hsn,
                    model,
                    itemName,
                    city,
                    countryOfOrigin,
                    availableUnits,
                    dimensions,
                    brand,
                    weight,
                    categoryId,
                    subCategoryId,
                    color,
                    size,
                    productPrice,
                    mrp,
                    description,
                    heading
                }    
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

    updateProductPrice: async (req, res, next) => {
        try {
            let userId = req.decoded._id;
            let { productPrice, id, availUnits } = req.body;
            let data = await productSchema.findOneAndUpdate({
                userId,
                _id: id
            }, {
                $set: {
                    productPrice,
                    availableUnits: availUnits
                }
            }, { new: true}).lean();
            return res.send({
                code: 200,
                data: data,
                message: "product price updated successfully!!",
                error: null
            })
        } catch (err) {
            next(err);
        }
    }
}