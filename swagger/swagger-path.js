const swaggerHelpers = require('../swagger/swagger-helpers');

module.exports = {
    "/": {
        "get": {
            "tags": ["Test"],
            "description": "Get root request's response from the api - basically server status",
            "responses": {
                "200": { "description": "Healthy! server status and API status." },
                "500": swaggerHelpers.responseObject['500']
            }
        }
    },
    "/users/login": {
        "post": {
            tags: ["users"],
            description: "Save follow users details",
            consumes: ["application/json"],
            produces: ["application/json"],
            parameters: [
                {
                    in: "body",
                    name: "Data",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            followedUserId: { type: 'string', example: '5d0374c66d47152fdad7e56c' },
                            followedName: { type: 'string', example: 'ravi teja' },
                            followedUsername: { type: 'string', example: 'ravi T' }
                        }
                    }
                }
            ],
            responses: {
                "200": swaggerHelpers.responseObject['200'],
                "500": swaggerHelpers.responseObject['500']
            }
        }
    },
    "/users/signup": {
        "post": {
            tags: ["users"],
            description: "Update follow users details",
            consumes: ["application/json"],
            produces: ["application/json"],
            parameters: [
                {
                    in: "body",
                    name: "Data",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            followedUserId: { type: 'string', example: '5d0374c66d47152fdad7e56c' },
                            followedName: { type: 'string', example: 'ravi teja' },
                            followedUsername: { type: 'string', example: 'ravi T' }
                        }
                    }
                }
            ],
            responses: {
                "200": swaggerHelpers.responseObject['200'],
                "500": swaggerHelpers.responseObject['500']
            }
        }
    }
}