const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'sellers',
        default: null
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        default: null
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'customers',
        default: null
    },
    feedback: {
        type: String,
        default: ""
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true});
const Products = mongoose.model('rating', ratingSchema);

module.exports = Products;