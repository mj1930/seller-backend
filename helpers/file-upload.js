const _AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');

const s3 = new _AWS.S3({
    secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY,
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

exports.upload = multer({
    storage: multerS3({
        s3: s3,
        // queueSize: 1,
        ACL: 'public-read',
        bucket: process.env.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, callback) {
            callback(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
        }
    }),
    fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname).toLowerCase();
        if (
            ext !== '.jpg' && ext !== '.jpeg' &&
            ext !== '.pdf' && ext !== '.png'
        ) {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true);
    }
});