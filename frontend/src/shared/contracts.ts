import { initContract } from "@ts-rest/core";
import {
  AuthResponse,
  LoginDto,
  RegisterDto,
} from "./interfaces/auth.interface";
import {
  CreateUserDto,
  DeleteUserResponse,
  UpdateUserDto,
  UserResponse,
  UsersResponse,
} from "./interfaces/user.interface";

const c = initContract();

const baseHeaders = c.type<{}>(); // Define empty headers type

export const apiContract = c.router({
  users: c.router({
    create: {
      method: "POST",
      path: "/users",
      body: c.type<CreateUserDto>(),
      headers: baseHeaders,
      responses: {
        201: c.type<UserResponse>(),
        400: c.type<{ message: string }>(),
      },
      summary: "Create user",
      description: "Create a new user with all required fields",
      metadata: { tags: ["users"] },
    },
    getAll: {
      method: "GET",
      path: "/users",
      headers: baseHeaders,
      responses: {
        200: c.type<UsersResponse>(),
        400: c.type<{ message: string }>(),
      },
      summary: "Get all users",
      description: "Retrieve a list of all users",
      metadata: { tags: ["users"] },
    },
    getById: {
      method: "GET",
      path: "/users/:id",
      headers: baseHeaders,
      pathParams: c.type<{ id: string }>(),
      responses: {
        200: c.type<UserResponse>(),
        404: c.type<{ message: string }>(),
      },
      summary: "Get user by ID",
      description: "Retrieve a single user by their ID",
      metadata: { tags: ["users"] },
    },
    update: {
      method: "PUT",
      path: "/users/:id",
      headers: baseHeaders,
      pathParams: c.type<{ id: string }>(),
      body: c.type<UpdateUserDto>(),
      responses: {
        200: c.type<UserResponse>(),
        404: c.type<{ message: string }>(),
      },
      summary: "Update user",
      description: "Update an existing user by their ID",
      metadata: { tags: ["users"] },
    },
    delete: {
      method: "DELETE",
      path: "/users/:id",
      headers: baseHeaders,
      pathParams: c.type<{ id: string }>(),
      responses: {
        200: c.type<DeleteUserResponse>(),
        404: c.type<{ message: string }>(),
      },
      summary: "Delete user",
      description: "Delete a user by their ID",
      metadata: { tags: ["users"] },
    },
  }),
  auth: c.router({
    register: {
      method: "POST",
      path: "/auth/register",
      headers: baseHeaders,
      body: c.type<RegisterDto>(),
      responses: {
        201: c.type<AuthResponse>(),
        400: c.type<{ message: string }>(),
      },
      summary: "Register new user",
      description: "Register a new user and return authentication token",
      metadata: { tags: ["auth"] },
    },
    login: {
      method: "POST",
      path: "/auth/login",
      headers: baseHeaders,
      body: c.type<LoginDto>(),
      responses: {
        200: c.type<AuthResponse>(),
        400: c.type<{ message: string }>(),
      },
      summary: "User login",
      description: "Authenticate user and return authentication token",
      metadata: { tags: ["auth"] },
    },
  }),
});
