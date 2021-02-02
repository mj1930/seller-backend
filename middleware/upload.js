const Joi = require('@hapi/joi');

const uploadService = require('../utils/multer/multer');
const ErrorResponse = require('../utils/error/errorResponse');

exports.uploadPost = async (req, res, next) => {
    uploadService.s3UploadPost(req, res, async (err) => {
        if(err) { return next(err); }

        if(!req.files) { return next(new ErrorResponse('Files are required', 400)); }

        if (req.files && req.files.length <= 1) {
            return next(new ErrorResponse('Either Video or thumbnail is missing', 400));
        }

        next();
    });
}

exports.uploadPostWithSong = async (req, res, next) => {
    const fields = [
        { name: 'thumbnail', maxCount: 1 },
        { name: 'video', maxCount: 1 },
        { name: 'song', maxCount: 1 }
    ];

    const s3UploadPostWithSong = uploadService.s3UploadPostWithSong(fields);

    s3UploadPostWithSong(req, res, async (err) => {
        if(err) { return next(err); }

        try {
            await Joi.object({
                thumbnail: Joi.array().items(Joi.object().required()).required(),
                video: Joi.array().items(Joi.object().required()).required(),
                song: Joi.array().items(Joi.object().required()).optional(),
            })
            .validateAsync(req.files)

            next()
        } catch (err) {
            return next(err)
        }
    });
}

exports.uploadRewardClaimSS = async (req, res, next) => {
    const pathNamePrefix = 'reward_claims'
    const fields = [
        { name: 'instagram', maxCount: 1 },
        { name: 'facebook', maxCount: 1 },
        { name: 'whatsapp', maxCount: 1 }
    ];

    uploadService.s3UploadImage(fields, pathNamePrefix)(req, res, async (err) => {
        if(err) { return next(err); }

        try {
            await Joi.object({
                instagram: Joi.array().items(Joi.object().required()).required(),
                facebook: Joi.array().items(Joi.object().required()).required(),
                whatsapp: Joi.array().items(Joi.object().required()).required(),
            })
            .validateAsync(req.files)

            next()
        } catch (err) {
            return next(new ErrorResponse(err.message, 400))
        }
    });
}

exports.uploadContestantDocuments = async (req, res, next) => {
    const pathNamePrefix = 'applications'
    const fields = [
        { name: 'profile_pic', maxCount: 1 },
        { name: 'identity', maxCount: 1 },
        { name: 'address_id', maxCount: 1 }
    ];

    const uploadContestantDocuments = uploadService.s3UploadImage(fields, pathNamePrefix);

    uploadContestantDocuments(req, res, async (err) => {
        if(err) { return next(err); }

        try {
            await Joi.object({
                profile_pic: Joi.array().items(Joi.object().required()).required(),
                identity: Joi.array().items(Joi.object().required()).required(),
                address_id: Joi.array().items(Joi.object().required()).optional(),
            })
            .validateAsync(req.files)

            next()
        } catch (err) {
            return next(err)
        }
    });
}