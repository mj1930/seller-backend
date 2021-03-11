const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    subCategoryName: {
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
    }
}, { timestamps: true});

const subCategories = mongoose.model('subCategory', subCategorySchema);

module.exports = subCategories;