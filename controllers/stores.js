const storeSchema = require('../models/stores');
const storeValidator = require('../helpers/stores.validators');

module.exports = {

    verifyStoreName: async (req, res, next) => {
        try {
            let { storename } = await storeValidator.verifyUsername().validateAsync(req.query);
            let count = await storeSchema.countDocuments({
                storename
            });
            return res.json({
                code: 200,
                count,
                mesaage: "count returned",
                error: null
            });
        } catch (err) {
            next(err);
        }
    }
}