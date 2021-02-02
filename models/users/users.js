const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    mobile: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    address: {
        type: Object,
        default: {}
    },
    hasGST: {
        type: Boolean,
        default: false
    },
    taxState: {
        type: String,
        default: ""
    },
    gstin: {
        type: String,
        default: ""
    },
    pan: {
        type: String,
        default: ""
    },
    accountNumber: {
        type: Number,
        default: ""
    },
    accountName: {
        type: String,
        default: ""
    },
    ifscCode:{
        type: String,
        default: ""
    }
}, { timestamps: true });

const Users = mongoose.model('users', UserSchema);

module.exports = Users;