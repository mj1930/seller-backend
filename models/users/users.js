const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    mobile: {
        type: String,
        default: ''
    },
    isMobileVerified: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    isEmailVerified: {
        type: Boolean,
        default: false
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
        type: String,
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