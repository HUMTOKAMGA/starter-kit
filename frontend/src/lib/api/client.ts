import { initClient } from "@ts-rest/core";
import { apiContract } from "../../shared/contracts";

export const api = initClient(apiContract, {
  baseUrl: "http://localhost:3000/api",
  baseHeaders: {
    "Content-Type": "application/json",
  },
});
