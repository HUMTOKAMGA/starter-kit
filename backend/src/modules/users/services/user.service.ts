import { Types } from "mongoose";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../../../shared/errors/app.error";
import { User } from "../models/user.model";

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class UserService {
  static async create(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: "user" | "admin";
    isActive?: boolean;
  }): Promise<UserResponse> {
    try {
      // Validate required fields
      const validationErrors: Record<string, string[]> = {};
      if (!userData.email) validationErrors.email = ["Email is required"];
      if (!userData.password)
        validationErrors.password = ["Password is required"];
      if (!userData.firstName)
        validationErrors.firstName = ["First name is required"];
      if (!userData.lastName)
        validationErrors.lastName = ["Last name is required"];

      if (Object.keys(validationErrors).length > 0) {
        throw new ValidationError(validationErrors);
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new ValidationError({
          email: ["Please enter a valid email address"],
        });
      }

      // Validate password length
      if (userData.password.length < 6) {
        throw new ValidationError({
          password: ["Password must be at least 6 characters long"],
        });
      }

      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new ConflictError("User with this email already exists");
      }

      const user = await User.create(userData);
      return {
        id: (user._id as Types.ObjectId).toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      if (error instanceof ConflictError || error instanceof ValidationError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new ValidationError({
          server: [error.message],
        });
      }
      throw error;
    }
  }

  static async getAll(): Promise<UserResponse[]> {
    try {
      const users = await User.find().select("-password");
      return users.map((user) => ({
        id: (user._id as Types.ObjectId).toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));
    } catch (error) {
      if (error instanceof Error) {
        throw new ValidationError({
          server: [error.message],
        });
      }
      throw error;
    }
  }

  static async getById(id: string): Promise<UserResponse> {
    try {
      const user = await User.findById(id).select("-password");
      if (!user) {
        throw new NotFoundError("User not found");
      }
      return {
        id: (user._id as Types.ObjectId).toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new ValidationError({
          server: [error.message],
        });
      }
      throw error;
    }
  }

  static async update(
    id: string,
    updateData: Partial<{
      firstName: string;
      lastName: string;
      email: string;
      role: "user" | "admin";
      isActive: boolean;
    }>
  ): Promise<UserResponse> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new NotFoundError("User not found");
      }

      // Check for email uniqueness if email is being updated
      if (updateData.email && updateData.email !== user.email) {
        const existingUser = await User.findOne({ email: updateData.email });
        if (existingUser) {
          throw new ConflictError("User with this email already exists");
        }
      }

      Object.assign(user, updateData);
      await user.save();

      return {
        id: (user._id as Types.ObjectId).toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ConflictError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new ValidationError({
          server: [error.message],
        });
      }
      throw error;
    }
  }

  static async delete(id: string): Promise<{ message: string }> {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      return { message: "User deleted successfully" };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new ValidationError({
          server: [error.message],
        });
      }
      throw error;
    }
  }
}
