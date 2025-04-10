import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { config } from "../../../config/env";
import { IUser, User } from "../../users/models/user.model";

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "user" | "admin";
  };
  token: string;
}

export class AuthService {
  static async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = await User.create(userData);
    const token = this.generateToken(user);

    return {
      user: {
        id: (user._id as Types.ObjectId).toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    };
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = this.generateToken(user);

    return {
      user: {
        id: (user._id as Types.ObjectId).toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    };
  }

  private static generateToken(user: IUser) {
    return jwt.sign(
      {
        id: (user._id as Types.ObjectId).toString(),
        email: user.email,
        role: user.role,
      },
      config.JWT_SECRET,
      { expiresIn: "24h" }
    );
  }
}
