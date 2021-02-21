const usersSchema = require('../models/users/users');
const storeSchema = require('../models/stores/storenames');

const userValidator = require('../validators/users.validators');
const crypto = require('../utils/crypto/Crypto');
const jwtService = require('../utils/jwt/jwt');
const { number } = require('@hapi/joi');

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
    }
}