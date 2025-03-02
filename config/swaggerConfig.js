const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "Food Restaurant API",
      version: "1.0.0",
      description: "API documentation for the Food Restaurant application",
    },
    servers: [
      {
        url: "http://localhost:3000", // Change this based on your environment
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }], // Apply globally or per route
  },
  apis: ["./routes/*.js"], // Path to the API docs (change based on your folder structure)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
