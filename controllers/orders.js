const orderSchema = require('../models/orders/orders');

const orderValidator = require('../validators/orders.validators');

module.exports = {

    listOrders: async (req, res, next) => {
        try {
            let userId = req.decoded._id;
            let { skip, limit } = await orderValidator.listOrder().validateAsync(req.body);
            let orders = await orderSchema.find({
                "products.sellerId": userId
            })
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
            let { skip, limit, status } = await orderValidator.filterOrders().validateAsync(req.body);
            let orders = await orderSchema.find({
                _id: userId,
                orderStatus: status
            })
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

    getOrdersByDate: async (req, res, next) => {
        try {
            let userId = req.decoded._id;
            let { startDate, endDate } = await orderValidator.getOrderByDate().validateAsync(req.body);
            let ordersData = await orderSchema.find({
                $and: [
                    {
                        _id: userId
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
            }).lean();
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
    }
}