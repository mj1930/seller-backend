const orderSchema = require('../models/orders/orders');

const orderValidator = require('../validators/orders.validators');

module.exports = {

    listOrders: async (req, res, next) => {
        try {
            let userId = req.decoded._id;
            let { skip, limit } = await orderValidator.listOrders().validateAsync(req.body);
            let orders = await orderSchema.find({
                _id: userId
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

    filterProducts: async (req, res, next) => {
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
    }
}