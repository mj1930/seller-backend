const ErrorResponse = require('../utils/error/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console
    if (err.name !== 'ValidationError') {
        console.log(err);
        console.log(err.name);
    }

    // validation error
    if (err.name === 'ValidationError') {
        // const message = Object.values(err.errors).map(val => val.message);
        const message = `${err.message}`;
        error = new ErrorResponse(message, 400);
    }

    // JWT Token Expired Error
    if (err.name === 'TokenExpiredError') {
        const message = `${err.message}`;
        error = new ErrorResponse(message, 403);
    }

    // JWT Token Authorization Error
    if (err.name === 'AuthorizationError') {
        const message = `${err.message}`;
        error = new ErrorResponse(message, 401);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        code: error.statusCode || 500,
        error: err.name || 'Server Error',
        data: null,
        message: error.message
    });
};

module.exports = errorHandler;