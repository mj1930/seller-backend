const jwtService = require('../utils/jwt/jwt');
const errorHandler = require('../utils/error/errorResponse');

module.exports = {
    authorize: async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1] || authHeader;
        if (!accessToken) {
            return next(new errorHandler('Un-Authorized Access(Missing accessToken)', 401));
        }
        try {
            let userData = await jwtService.verify(accessToken);
            if (userData && userData._id) {
                req.decoded = userData;
                next();
            } else {
                next(new errorHandler('Invalid token or expired token', 401));
            }
        } catch (err) {
            next(err);
        }
    }
}