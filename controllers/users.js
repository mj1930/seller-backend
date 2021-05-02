const usersSchema = require('../models/users/users');
const storeSchema = require('../models/stores/storenames');

const userValidator = require('../validators/users.validators');
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
                        name: data.name,
                        email: data.email
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
                    code: 400,
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
            delete sellerData.password;
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

    listAllUsers: async (req, res, next) => {
        try {
            let { skip, limit } = await userValidator.listAllUsers().validateAsync(req.body);
            let usersData = await usersSchema.find({
                isDeleted: false
            })
            .skip(skip)
            .limit(limit)
            .lean();
            if (usersData && usersData.length > 0) {
                return res.json({
                    code: 200,
                    data: usersData,
                    message: "Found all active users",
                    error: null
                });
            } else {
                return res.json({
                    code: 200,
                    data: {},
                    message: "No users found !!",
                    error: null
                });
            }
        } catch (err) {
            next(err);
        }
    },

    getUserData: async (req, res, next) => {
        try {
            let userId = req.decoded._id;
            let userData = await usersSchema.findOne({
                _id: userId
            }).lean();
            userData.mobile = await crypto.staticDecrypter(userData.mobile);
            if (userData.accountNumber)
                userData.accountNumber = await crypto.staticDecrypter(userData.accountNumber);
            if (userData.gstin)
                userData.gstin = await crypto.staticDecrypter(userData.gstin);
            if (userData.pan)
                userData.pan = await crypto.staticDecrypter(userData.pan);
            let storeData = await storeSchema.findOne({
                userId
            }).lean();
            if (storeData)
                userData['storeName'] = storeData.storename;
            delete userData.password;
            const accessToken = await jwtService.generateAccessToken({
                _id: userData._id,
                name: userData.name
            });
            if (userData) {
                return res.json({
                    code: 200,
                    message: 'User profile data found !!',
                    data: userData,
                    accessToken,
                    error: null
                });
            } else {
                return res.json({
                    code: 400,
                    message: 'No user found !!',
                    data: {},
                    accessToken,
                    error: null
                });
            }
        } catch (err) {
            next(err);
        }
    }
}