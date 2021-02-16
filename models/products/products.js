const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productId: {
        type: String,
        default: ""
    },
    itemName: {
        type: String,
        default: ""
    },
    countryOfOrigin: {
        type: String,
        default: ""
    },
    manufacturer: {
        type: String,
        default: ""
    },
    itemsNum: {
        type: Number,
        default: 0
    },
    colorName: {
        type: String,
        default: ""
    },
    includedComponents: {
        type: String,
        default: ""
    },
    exclosureMaterial: {
        type: String,
        default: ""
    },
    itemTypeName: {
        type: String,
        default: ""
    },
    sizeMap: {
        type: String,
        default: ""
    },
    manufacturerContact: {
        type: String,
        default: ""
    },
    productDimensions: {
        type: Object,
        default: {}
    },
    unitCount: {
        type: Number,
        default: 0
    },
    unitCountType: {
        type: Number,
        default: 0
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    feedback: {
        type: String,
        default: ""
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true});

const Products = mongoose.model('products', productSchema);

module.exports = Products;