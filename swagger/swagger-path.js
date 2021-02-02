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
                            email: { type: 'string', example: 'abc@gmail.com' },
                            password: { type: 'string', example: 'test' }
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
                            name: { type: 'string', example: 'abc' },
                            mobile: { type: 'string', example: '9876543210' },
                            email: { type: 'string', example: 'abc@gmail.com' },
                            password: { type: 'string', example: 'test' }
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
    "/users/add-seller-details": {
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
                            name: { type: 'string', example: 'test' },
                            address :{ type: 'Object', example: 'test' },
                            hasGST: { type: 'boolean', example: false },
                            taxState: { type: 'string', example: 'test' },
                            gstin: { type: 'string', example: 'test' },
                            pan: { type: 'string', example: 'test' },
                            accountNumber: { type: 'string', example: '12345789' },
                            accountName: { type: 'string', example: 'test' },
                            ifscCode: { type: 'string', example: 'test' },
                            storename: { type: 'string', example: 'test' }
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