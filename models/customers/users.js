const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fname: {
        type: String,
        default: ""
    },
    lname: {
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
    gender: {
        type: String,
        default: ""
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    address: {
        type: Object,
        default: {}
    },
}, { timestamps: true });

const Users = mongoose.model('customers', UserSchema);

module.exports = Users;