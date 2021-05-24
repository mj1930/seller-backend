const orderSchema = require('../models/orders/orders');
const sellerSchema = require('../models/users/users');
const userSchema = require('../models/customers/users');
const crypto = require('../utils/crypto/Crypto')
const _ = require('underscore');

const orderValidator = require('../validators/orders.validators');

module.exports = {

    listOrders: async (req, res, next) => {
        try {
            let userId = req.decoded._id;
            let { skip, limit } = await orderValidator.listOrder().validateAsync(req.body);
            let orders = await orderSchema.find({
                "products.sellerId": userId
            }, {
                mode: 1,
                createdAt: 1,
                totalAmnt: 1,
                orderStatus: 1,
                paymentMode: 1,
                address: 1,
                products: {
                    $elemMatch: {
                        sellerId: userId
                    }
                }
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
            return res.json({
                code: 200,
                data: orders,
                message: "Orders list fetched",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    filterOrders: async (req, res, next) => {
        try {
            let userId = req.decoded._id;
            let orders = []
            let { skip, limit, status, search } = await orderValidator.filterOrders().validateAsync(req.body);
            if (search) {
                orders = await orderSchema.find({
                    "products.sellerId": userId,
                    $and: [
                        { orderStatus: status },
                        { paymentMode: { $regex: new RegExp(search, 'i') } }
                    ]
                }, {
                    mode: 1,
                    createdAt: 1,
                    totalAmnt: 1,
                    orderStatus: 1,
                    paymentMode: 1,
                    address: 1,
                    products: {
                        $elemMatch: {
                            sellerId: userId
                        }
                    }
                })
                .skip(skip)
                .limit(limit)
                .lean();
            } else {
                orders = await orderSchema.find({
                    "products.sellerId": userId,
                    orderStatus: status
                }, {
                    mode: 1,
                    createdAt: 1,
                    totalAmnt: 1,
                    orderStatus: 1,
                    paymentMode: 1,
                    address: 1,
                    products: {
                        $elemMatch: {
                            sellerId: userId
                        }
                    }
                })
                .skip(skip)
                .limit(limit)
                .lean();
            }
            return res.json({
                code: 200,
                data: orders,
                message: "Orders list fetched",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    getOrdersByDate: async (req, res, next) => {
        try {
            let userId = req.decoded._id;
            let { startDate, endDate } = await orderValidator.getOrderByDate().validateAsync(req.body);
            let ordersData = await orderSchema.find({
                $and: [
                    {
                        "products.sellerId": userId
                    },
                    {
                        orderStatus: 'DL'
                    },
                    {
                        createdAt: {
                            $gte: startDate,
                            $lte: endDate
                        }
                    }
                ]
            }, {
                totalAmnt: 1,
                createdAt: 1,
                products: {
                    $elemMatch: {
                        sellerId: userId
                    }
                }
            }).lean();
            return res.json({
                code: 200,
                data: ordersData,
                message: '',
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    updateOrderStatus: async (req, res, next) => {
        try {
            let { orderId, status } = await orderValidator.updateOrder().validateAsync(req.body);
            let orders = await orderSchema.findOneAndUpdate({
                _id: orderId
            }, {
                $set: {
                    orderStatus: status  
                }
            }, { new : true}).lean();
            return res.json({
                code: 200,
                data: orders,
                message: "Orders list fetched",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    sortOrder: async (req, res, next) => {
        try {
            let userId = req.decoded._id;
            let { key, sortBy, skip, limit } = await orderValidator.sortOrder().validateAsync(req.body);
            let query = {};
            query[key] = sortBy;
            let products = await orderSchema.find({}, {
                mode: 1,
                createdAt: 1,
                totalAmnt: 1,
                orderStatus: 1,
                paymentMode: 1,
                address: 1,
                products: {
                    $elemMatch: {
                        sellerId: userId
                    }
                }
            })
                .sort(query)
                .skip(skip)
                .limit(limit)
                .lean();
            return res.json({
                code: 200,
                data: products,
                message: "Sorted List",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    searchOrdersByTerm: async (req, res, next) => {
        try {
            let userId = req.decoded._id;
            const { skip, limit, search, status } = await orderValidator.searchOrders().validateAsync(req.body);
            let productDetails = [];
            if (status) {
                productDetails = await orderSchema.find({
                    $and: [
                        {
                            orderStatus: status
                        },
                        {
                            paymentMode: { $regex: new RegExp(search, 'i') }
                        }
                    ]
                }, {
                    mode: 1,
                    createdAt: 1,
                    totalAmnt: 1,
                    orderStatus: 1,
                    paymentMode: 1,
                    address: 1,
                    products: {
                        $elemMatch: {
                            sellerId: userId
                        }
                    }
                }, {
                    mode: 1,
                    createdAt: 1,
                    totalAmnt: 1,
                    orderStatus: 1,
                    paymentMode: 1,
                    address: 1,
                    products: {
                        $elemMatch: {
                            sellerId: userId
                        }
                    }
                }).sort({
                    createdAt: -1
                }).skip(skip)
                    .limit(limit)
                    .lean()
            } else {
                productDetails = await orderSchema.find({
                    $and: [
                        {
                            paymentMode: { $regex: new RegExp(search, 'i') }
                        }
                    ]
                }, {
                    mode: 1,
                    createdAt: 1,
                    totalAmnt: 1,
                    orderStatus: 1,
                    paymentMode: 1,
                    address: 1,
                    products: {
                        $elemMatch: {
                            sellerId: userId
                        }
                    }
                }).sort({
                    createdAt: -1
                }).skip(skip)
                    .limit(limit)
                    .lean()
            }
            return res.send({
                code: 200,
                data: productDetails,
                message: "Searched list with all possibility",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    searchOrdersByOrderId: async (req, res, next) => {
        try {
            let userId = req.decoded._id;
            const { skip, limit, orderId } = await orderValidator.searchOrdersById().validateAsync(req.body);
            let productDetails = await orderSchema.find({
                $and: [
                    {
                        _id: orderId
                    }
                ]
            }, {
                mode: 1,
                createdAt: 1,
                totalAmnt: 1,
                orderStatus: 1,
                paymentMode: 1,
                address: 1,
                products: {
                    $elemMatch: {
                        sellerId: userId
                    }
                }
            }).sort({
                createdAt: -1
            }).skip(skip)
                .limit(limit)
                .lean()
            return res.send({
                code: 200,
                data: productDetails,
                message: "Searched list with all possibility",
                error: null
            });
        } catch (err) {
            next(err);
        }
    },

    printInvoice: async (req, res, next) => {
        try {
            let id = req.params.id;
            let orders = await orderSchema.findOne({
                $and: [
                    {
                        _id: id
                    }
                ]
            }).lean();
            let sellerIds = orders?.products?.length ? _.map(orders.products, 'sellerId') : [];
            let sellerData = await sellerSchema.find({
                _id : { $in : sellerIds }
            }, { address: 1, name: 1, gstin: 1, pan: 1}).lean();
            for (let i = 0; i < sellerData.length;i++) {
                let pan = sellerData[i].pan ? await crypto.staticDecrypter(sellerData[i].pan) : '';
                let gstin = sellerData[i].gstin ? await crypto.staticDecrypter(sellerData[i].gstin) : '';
                sellerData[i]['pan'] = pan;
                sellerData[i]['gstin'] = gstin;
            }
            orders['sellerDetails'] = sellerData;
            let userData = await userSchema.findOne({
                _id: orders.userId
            }, { address : 1}).lean();
            orders['userDetails'] = userData;
            return res.json({
                code: 200,
                data: orders,
                message: "",
                error: null
            });
        } catch (err) {
            next(err);
        }
    }
}