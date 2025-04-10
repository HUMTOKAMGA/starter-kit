import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { config } from "./config/env";
import userRoutes from "./modules/users/routes/user.routes";
import { errorHandler } from "./shared/middleware/error.middleware";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

export default app;
