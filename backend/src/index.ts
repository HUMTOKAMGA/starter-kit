import { apiContract } from "@/contracts";
import { connectDB } from "@config/database";
import { config } from "@config/env";
import { generateSwaggerDoc, swaggerUiHtml } from "@config/swagger";
import { errorHandler } from "@core/middleware/error.middleware";
import { AuthService } from "@modules/auth/services/auth.service";
import { UserService } from "@modules/users/services/user.service";
import { createExpressEndpoints } from "@ts-rest/express";
import cors from "cors";
import express from "express";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Create Express endpoints
createExpressEndpoints(
  apiContract,
  {
    users: {
      create: async ({ body }) => {
        const user = await UserService.create(body);
        return {
          status: 201,
          body: {
            user: {
              ...user,
              createdAt: user.createdAt.toISOString(),
              updatedAt: user.updatedAt.toISOString(),
            },
          },
        };
      },
      getAll: async () => {
        const users = await UserService.getAll();
        return {
          status: 200,
          body: {
            users: users.map((user) => ({
              ...user,
              createdAt: user.createdAt.toISOString(),
              updatedAt: user.updatedAt.toISOString(),
            })),
          },
        };
      },
      getById: async ({ params }) => {
        const user = await UserService.getById(params.id);
        return {
          status: 200,
          body: {
            user: {
              ...user,
              createdAt: user.createdAt.toISOString(),
              updatedAt: user.updatedAt.toISOString(),
            },
          },
        };
      },
      update: async ({ params, body }) => {
        const user = await UserService.update(params.id, {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          role: body.role,
          isActive: body.isActive,
        });
        return {
          status: 200,
          body: {
            user: {
              ...user,
              createdAt: user.createdAt.toISOString(),
              updatedAt: user.updatedAt.toISOString(),
            },
          },
        };
      },
      delete: async ({ params }) => {
        const result = await UserService.delete(params.id);
        return {
          status: 200,
          body: result,
        };
      },
    },
    auth: {
      register: async ({ body }) => {
        const result = await AuthService.register({
          email: body.email,
          password: body.password,
          firstName: body.firstName,
          lastName: body.lastName,
        });
        return {
          status: 201,
          body: result,
        };
      },
      login: async ({ body }) => {
        const result = await AuthService.login(body.email, body.password);
        return {
          status: 200,
          body: result,
        };
      },
    },
  },
  app
);

// Generate OpenAPI documentation
const openApiDoc = generateSwaggerDoc();

// Serve Swagger UI
app.get("/api/docs", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(swaggerUiHtml(openApiDoc));
});

// Error handling
app.use(errorHandler);

const port = config.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
