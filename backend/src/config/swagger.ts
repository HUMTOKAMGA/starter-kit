import { generateOpenApi } from "@ts-rest/open-api";
import { apiContract } from "../contracts";

export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API Documentation for the Starter Kit",
    contact: {
      name: "API Support",
      email: "support@example.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local Development Server",
    },
  ],
  tags: [
    {
      name: "users",
      description: "User management endpoints",
    },
    {
      name: "auth",
      description: "Authentication endpoints",
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  components: {
    schemas: {
      CreateUserRequest: {
        type: "object",
        required: ["email", "password", "firstName", "lastName"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "test@test.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "Test123",
          },
          firstName: {
            type: "string",
            example: "test",
          },
          lastName: {
            type: "string",
            example: "john",
          },
          role: {
            type: "string",
            enum: ["user", "admin"],
            example: "admin",
          },
          isActive: {
            type: "boolean",
            example: true,
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

export const generateSwaggerDoc = () => {
  return generateOpenApi(apiContract, swaggerConfig);
};

export const swaggerUiHtml = (openApiDoc: any) => `
<!DOCTYPE html>
<html>
  <head>
    <title>API Documentation</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4/swagger-ui.css">
    <style>
      body { margin: 0; }
      .swagger-ui .topbar { background-color: #1976d2; }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@4/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          spec: ${JSON.stringify(openApiDoc)},
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIBundle.SwaggerUIStandalonePreset
          ],
        });
      };
    </script>
  </body>
</html>
`;
