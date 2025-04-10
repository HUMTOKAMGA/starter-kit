import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { AppError } from "../errors/app.error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  // Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    const errors: Record<string, string[]> = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = [err.errors[key].message];
    });
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  // Handle Mongoose duplicate key errors
  if (err instanceof mongoose.Error && (err as any).code === 11000) {
    return res.status(409).json({
      message: "Duplicate key error",
      errors: {
        [Object.keys((err as any).keyPattern)[0]]: [
          "This value already exists",
        ],
      },
    });
  }

  // Handle custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    message: "Internal server error",
    errors: {
      server: ["An unexpected error occurred"],
    },
  });
};
