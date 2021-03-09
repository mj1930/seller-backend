// const otpSchema = require('../models/users/otp');
const usersSchema = require('../models/users/users');

// const optValidator = require('../validators/otp.validators');
const emailValidator = require('../validators/email.validators');

// const accountId = process.env.ACCOUNT_SID;
// const twilioToken = process.env.TWILIO_AUTH_TOKEN;
// const phone = process.env.PHONE_NUMBER;
// const client = require('twilio')(accountId, twilioToken);
const nodemailer = require('nodemailer');

module.exports = {

    // sendOTP: async (req, res, next) => {
    //     try {
    //         let { mobileNum } = await optValidator.sendOtp().validateAsync(req.body);
    //         let otp = Math.floor(100000 + Math.random() * 900000);
    //         client.messages
    //         .create({
    //             to: '+15017122661',
    //             from: phone,
    //             body: `OTP for verification is ${otp}`,
    //         })
    //         .then(async (message) => {
    //             console.log(message.sid)
    //             const otpData = await otpSchema.save({
    //                 otp,
    //                 mobile: mobileNum,
    //                 isOtpExpired: false
    //             });
    //             res.send({
    //                 code: 200,
    //                 data: {},
    //                 message: "OTP sent succesfully",
    //                 error: null
    //             });
    //         });
    //     } catch (err) {
    //         next(err);
    //     }
    // },

    // verifyOtp: async (req, res, next) => {
    //     try {
    //         let { mobileNum, otp } = await optValidator.verifyOtp().validateAsync(req.body);;
    //         let isVerified = await otpSchema.findOne({
    //             mobile: mobileNum,
    //             otp,
    //             isOtpVerified: false
    //         });
    //         await otpSchema.updateOne(
    //             {
    //                 mobile: mobileNum
    //             }, {
    //                 $set: {
    //                     isOtpVerified: true
    //                 }
    //             }
    //         );
    //         return res.json({
    //             code: 200,
    //             data: isVerified ? true : false,
    //             message: "",
    //             error: null
    //         });
    //     } catch (err) {
    //         next(err);
    //     }
    // },

    sendEmailVerification: async(req, res, next) => {
        try {
            let { email } = await emailValidator.sendEmailVerification().validateAsync(req.body);
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'myprojectindiafirst@gmail.com',
                    pass: 'zxcv1234@'
                }
            });
            let message = {
                from: process.env.senderMail,
                to: email,
                subject: 'Verification email',
                html: `<h1>Please click on the link below to verify your mail.</h1>
                        <p>${process.env.SELLER_URL}/seller/email-verification</p>`
            };
            transporter.sendMail(message, (err, info) => {
                if (err) return next(err);
                return res.json({
                    code: 200,
                    data: info,
                    message: "Email verified succesfully !!",
                    error: null
                });
            });
        } catch(err) {
            next(err);
        }
    },

    verifyEmail: async (req, res, next) => {
        try {
            let { email } = await emailValidator.sendEmailVerification().validateAsync(req.body);
            let userData = await usersSchema.findOneAndUpdate({
                email
                },
                {
                    $set: {
                        isEmailVerified: true
                    }
            }, {new: true});
            if (userData && userData.isEmailVerified) {
                return res.json({
                    code: 200,
                    data: {},
                    message: "Email verified succesfully !!",
                    error: null
                });
            } else {
                return res.json({
                    code: 200,
                    data: {},
                    message: "Email not verified !!",
                    error: null
                });
            }
        } catch (err) {
            next(err);
        }
    }
}