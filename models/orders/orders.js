const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    mode: {
        type: String,
        default: "website"
    },
    products: {
        type: Array,
        default: [
            {
                productName: {
                    type: String,
                    default: ""
                },
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    default: 0
                },
                orderPrice: {
                    type: String,
                    default: ""
                },
                sellerId: {
                    type: Schema.Types.ObjectId,
                    ref: 'sellers',
                    default: null
                }
            }
        ]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    totalAmnt: {
        type: String,
        default: ""
    },
    address: {
        type: Object,
        default: {}
    },
    userGstin: {
        type: String,
        default: ""
    },
    businessName: {
        type: String,
        default: ""
    },
    paymentMode: {
        type: String,
        default: ""
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    orderStatus: {
        type: String,
        default: 'P' // P - pending, D-dispatched, RF- refunded, C- cancelled, RT- returned
    }
}, {timestamps: true});

const Orders = mongoose.model('order', orderSchema);

module.exports = Orders;

