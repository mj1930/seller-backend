const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema({
     otp: {
        type: Number,
        default: 0
    },
    mobile: {
        type: Number,
        default: 0
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    }
});

const Otp = mongoose.model('otp', otpSchema);

module.exports = Otp;