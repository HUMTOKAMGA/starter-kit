import { initContract } from "@ts-rest/core";

const c = initContract();

export const userContract = c.router({
  getAll: {
    method: "GET",
    path: "/users",
    responses: {
      200: c.type<{ users: any[] }>(),
    },
    summary: "Get all users",
  },
  getById: {
    method: "GET",
    path: "/users/:id",
    responses: {
      200: c.type<{ user: any }>(),
      404: c.type<{ message: string }>(),
    },
    summary: "Get user by ID",
  },
  // Autres endpoints...
});
