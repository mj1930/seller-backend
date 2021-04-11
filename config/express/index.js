'use strict';

const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger/swagger-json');

module.exports = (app, express) => {
    app.use(compression());
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        parameterLimit: 100000,
        limit: "50mb",
        extended: true
    }));
    app.use(cookieParser());
    app.use(express.static(path.join(__rootDir, "public")));
    app.use('/api-docs',
        swaggerUi.serve,
        (req, res, next) => {
            let { username, key } = req.query;
            if (username && key && username === process.env.SWAGGER_USERNAME && key === process.env.SWAGGER_PASSWORD) {
                next();
            } else {
                res.status(401).json({ code: 401, message: 'Un-autherized access' });
            }
        },
        swaggerUi.setup(swaggerDocument, {
            explorer: true
        }));
};