const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    img: {
        type: String,
        default: "" 
    }
}, { timestamps: true});

const Categories = mongoose.model('category', categorySchema);

module.exports = Categories;