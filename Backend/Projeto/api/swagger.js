const swaggerAutogen = require("swagger-autogen")()
 
const doc = {
    info: {
        version: "1.0.0",
        title: "Social Networking API",
        description: "API for a social networking using NodeJS and MongoDB."
    },
    host: `localhost:5000`,
    basePath: "/",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
        JWT: {
            type: "apiKey",
            name: "Authorization",
            description: "Bearer ",
            in: "header",
        }
    },
    definitions: {
        User: {
            $user: "john10",
            $password: "Password123456*",
            profile: { $ref: '#/definitions/Profile' }
        },
        Login: {
            $user: "john10",
            $password: "Password123456*",
        },
        Registry: {
            $user: "john",
            $password: "Password123456*",
            name: "John Mark"
        },
        Profile: {
            $name: "John Mark",
            $user: "john10",
            followers: [{ $ref: '#/definitions/Profile' }],
            following: [{ $ref: '#/definitions/Profile' }]
        },
        Post: {
            $title: "This is a title of a post...",
            $description: "This is a description of a post...",
            $profile: { $ref: '#/definitions/Profile' },
            comments: [ { $ref: '#/definitions/Comment' }],
            likes: [{ $ref: '#/definitions/Profile' }]
        }, 
        Comment: {
            $description: "This is a description of a comment...",
            $profile: { $ref: '#/definitions/Profile' },
            $post: [ { $ref: '#/definitions/Post' }],
            likes: [{ $ref: '#/definitions/Profile' }]
        }
    }
};
 
const outputFile = "./swagger_output.json";
const endpointFiles = [ "./app.js" ]; 
 
swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
    require("./index.js");
});