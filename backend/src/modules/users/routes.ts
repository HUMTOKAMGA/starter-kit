import { initContract } from "@ts-rest/core";
import {
  CreateUserDto,
  DeleteUserResponse,
  UpdateUserDto,
  UserResponse,
  UsersResponse,
} from "../../shared/interfaces/user.interface";

const c = initContract();

export const userRoutes = c.router({
  create: {
    method: "POST",
    path: "/users",
    body: c.type<CreateUserDto>(),
    responses: {
      201: c.type<UserResponse>(),
      400: c.type<{ message: string }>(),
    },
    summary: "Create user",
    description: "Create a new user with all required fields",
    metadata: {
      tags: ["users"],
    },
  },
  getAll: {
    method: "GET",
    path: "/users",
    responses: {
      200: c.type<UsersResponse>(),
      400: c.type<{ message: string }>(),
    },
    summary: "Get all users",
    description: "Retrieve a list of all users",
    metadata: {
      tags: ["users"],
    },
  },
  getById: {
    method: "GET",
    path: "/users/:id",
    pathParams: c.type<{ id: string }>(),
    responses: {
      200: c.type<UserResponse>(),
      404: c.type<{ message: string }>(),
    },
    summary: "Get user by ID",
    description: "Retrieve a single user by their ID",
    metadata: {
      tags: ["users"],
    },
  },
  update: {
    method: "PUT",
    path: "/users/:id",
    pathParams: c.type<{ id: string }>(),
    body: c.type<UpdateUserDto>(),
    responses: {
      200: c.type<UserResponse>(),
      404: c.type<{ message: string }>(),
    },
    summary: "Update user",
    description: "Update an existing user by their ID",
    metadata: {
      tags: ["users"],
    },
  },
  delete: {
    method: "DELETE",
    path: "/users/:id",
    pathParams: c.type<{ id: string }>(),
    responses: {
      200: c.type<DeleteUserResponse>(),
      404: c.type<{ message: string }>(),
    },
    summary: "Delete user",
    description: "Delete a user by their ID",
    metadata: {
      tags: ["users"],
    },
  },
});
