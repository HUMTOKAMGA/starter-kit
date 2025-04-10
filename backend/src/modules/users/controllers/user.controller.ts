import { NextFunction, Request, Response } from "express";
import {
  CreateUserDto,
  UpdateUserDto,
} from "../../../shared/interfaces/user.interface";
import { UserService } from "../services/user.service";

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body as CreateUserDto;
      const user = await UserService.create(userData);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAll();
      res.json({ users });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserService.getById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateData = req.body as UpdateUserDto;
      const user = await UserService.update(id, updateData);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await UserService.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
