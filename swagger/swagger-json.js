const swaggerHelpers = require('./swagger-helpers');
const swaggerPath = require('./swagger-path');

module.exports = {
    "swagger": "2.0",
    "info": swaggerHelpers.info,
    "host": "localhost:3003",
    "basePath": "/",
    "tags": swaggerHelpers.tags,
    "schemes": ["http","https"],
    "consumes": ["application/json"],
    "produces": ["application/json"],
    "paths": swaggerPath,
    "securityDefinitions": {
        authenticate: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Please provide the valid access token, if you dont have please login and get the token as response!"
        }
    }
}