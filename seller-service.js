'use strict';
// require('newrelic');
require('dotenv').config();
global.__rootDir = __dirname;
const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();


const initializeApp = async () => {
    const port = process.env.PORT;
    require("./connection/db");
    require('./config/express/index')(app, express);
    require("./routes/index")(app);
    app.use(require('./middleware/error'));

    app.get('/', (req, res, next) => {
        res.json({
            code: 200,
            title: 'Everything looks fine.'
        });
    });
    if (process.env.SSL_ENV === 'production') {
        https.createServer({
            key: fs.readFileSync(process.env.PRIVATE_KEY),
            cert: fs.readFileSync(process.env.CERT)
        }, app).listen(port, () => {
            console.log(`--- Service listening at ${process.env.NODE_ENV} ${port} with ssl---`);
        });
    } else {
        app.listen(port, () => {
            console.log(`--- Service listening at ${process.env.NODE_ENV} ${port} ---`);
        });
    }

    process.on('uncaughtException', function (err) {
        console.error(err);
        console.log("Node NOT Exiting...", err);
    });

};

const bootstrap = async () => {
    await initializeApp();
};

bootstrap();