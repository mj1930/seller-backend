const info = {
    "version": "2.0.0",
    "title": "Sellers - Api Documentation",
    "description": "Detailed Api documentaion for the `Chingari App`",
    "license": {
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
    },
    "contact": {
        "email": "jainmiir84@gmail.com"
    }
}

const tags = [
    { name: "users", description: "API for Users - related in the app" }
];

/**
 * 1xx: Informational (request has been received and the process is continuing).
 * 2xx: Success (action was successfully received, understood, and accepted).
 * 3xx: Redirection (further action must be taken in order to complete the request).
 * 4xx: Client Error (request contains incorrect syntax or cannot be fulfilled).
 * 5xx: Server Error (server failed to fulfill an apparently valid request).
 */
const responseObject = {
    200: { description: "Success response with data" },
    400: { description: "Bad Request with error data" },
    401: { description: "Unauthorized" },
    404: { description: "Not found with error data" },
    500: { description: "Server is down" }
};

module.exports = { info, tags, responseObject }