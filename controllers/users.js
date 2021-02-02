const usersSchema = require('../models/users/users');
const storeSchema = require('../models/stores/storenames');
const userValidator = require('../helpers/users.validators');
const crypto = require('../utils/crypto/Crypto');
const jwtService = require('../utils/jwt/jwt');
module.exports = {

    login : async (req, res, next) => {
        try {
            let { email, password } = await userValidator.login().validateAsync(req.body);
            let count = await usersSchema.countDocuments({
                email
            });
            if (count) {
                let data = await usersSchema.findOne({
                    email
                }).lean();
                let userPassword = await crypto.staticDecrypter(data.password);
                if(password === userPassword) {
                    const accessToken = await jwtService.generateAccessToken({
                        _id: data._id,
                        name: data.name
                    });
                    return res.json({
                        code: 200,
                        data,
                        message: "Fetched user details",
                        accessToken
                    });
                } else {
                    return res.json({
                        code: 400,
                        data: {},
                        message: "password did not match",
                        accessToken: {}
                    }); 
                }
            } else {
                return res.json({ 
                    code: 400,
                    data: {},
                    messgae: "User not registered.", 
                    error: null 
                });
            }
        } catch (err) {
            next(err);
        }
    },

    signup: async (req, res, next) => {
        try {
            let {
                mobile, name, email, password
            } = await userValidator.signup().validateAsync(req.body);
            let count = await usersSchema.countDocuments({
                email
            });
            if (count) {
                return res.json({
                    code: 200,
                    message: 'Email already exists !!',
                    data:{},
                    error: null
                }); 
            }
            mobile = await crypto.staticEncrypter(mobile);
            password = await crypto.staticEncrypter(password);
            let data = new usersSchema({
                name,
                mobile,
                email,
                password
            });
            const sellerData = await data.save();
            const accessToken = await jwtService.generateAccessToken({
                _id: sellerData._id,
                name: sellerData.name
            });
            delete sellerData.mobile;
            if (sellerData) {
                return res.json({
                    code: 200,
                    message: 'Registration Completed!!',
                    data: sellerData,
                    accessToken,
                    error: null
                });
            } else {
                return res.json({ 
                    code: 400,
                    data: {},
                    messgae: "Something Error!! Not created successfully.", 
                    error: null 
                });
            }
        } catch (err) {
            next(err)
        }
    },

    addSellerDetails: async (req, res, next) => {
        try {
            let userId = req.decoded._id;
            let { address, hasGST, taxState, gstin, pan, accountNumber, accountName, ifscCode, storename } = await userValidator.addSellerDetails().validateAsync(req,body);
            pan = await crypto.staticEncrypter(pan);
            gstin = await crypto.staticEncrypter(gstin);
            accountNumber = await crypto.staticEncrypter(accountNumber);
            const sellerData = await usersSchema.findOneAndUpdate({
                _id: userId
            }, {
                $set: {
                    address,
                    hasGST,
                    taxState,
                    gstin,
                    pan,
                    accountNumber,
                    accountName,
                    ifscCode
                }
            }, {new : true});
            const storeData = await storeSchema.create({
                userId: sellerData._id,
                storename
            });
            if (sellerData && storeData) {
                return res.json({
                    code: 200,
                    message: 'Registration Completed!!',
                    data: sellerData,
                    accessToken,
                    error: null
                });
            } else {
                return res.json({ 
                    code: 400,
                    data: {},
                    messgae: "Something Error!! Not created successfully.", 
                    error: null 
                });
            }
        } catch (err) {
            next(err)
        }
    }

}