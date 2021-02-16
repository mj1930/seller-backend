const usersSchema = require('../models/users/users');
const storeSchema = require('../models/stores/storenames');

const storeValidator = require('../validators/stores.validators');
const crypto = require('../utils/crypto/Crypto');
const jwtService = require('../utils/jwt/jwt');

module.exports = {

    addSellerDetails: async (req, res, next) => {
        try {
            let userId = req.decoded._id;
            let { address, hasGST, taxState, gstin, pan, accountNumber, accountName, ifscCode, storename } = await storeValidator.addSellerDetails().validateAsync(req.body);
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
            const accessToken = await jwtService.generateAccessToken({
                _id: sellerData._id,
                name: sellerData.name
            });
            if (sellerData && storeData) {
                return res.json({
                    code: 200,
                    message: 'Details updated !!',
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

    verifyStoreName: async (req, res, next) => {
        try {
            let { storename } = await storeValidator.verifyUsername().validateAsync(req.query);
            let count = await storeSchema.countDocuments({
                storename
            });
            return res.json({
                code: 200,
                count,
                message: "count returned",
                error: null
            });
        } catch (err) {
            next(err);
        }
    }
}