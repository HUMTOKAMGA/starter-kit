import { initContract } from "@ts-rest/core";
import {
  AuthResponse,
  LoginDto,
  RegisterDto,
} from "../../shared/interfaces/auth.interface";

const c = initContract();

export const authRoutes = c.router({
  register: {
    method: "POST",
    path: "/auth/register",
    body: c.type<RegisterDto>(),
    responses: {
      201: c.type<AuthResponse>(),
      400: c.type<{ message: string }>(),
    },
    summary: "Register new user",
    description: "Register a new user and return authentication token",
    metadata: {
      tags: ["auth"],
    },
  },
  login: {
    method: "POST",
    path: "/auth/login",
    body: c.type<LoginDto>(),
    responses: {
      200: c.type<AuthResponse>(),
      400: c.type<{ message: string }>(),
    },
    summary: "User login",
    description: "Authenticate user and return authentication token",
    metadata: {
      tags: ["auth"],
    },
  },
});
