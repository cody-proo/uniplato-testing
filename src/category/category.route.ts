import { UserRole } from "@prisma/client";
import { Express } from "express";
import { AppMiddleware } from "../config/middleware.config";
import { UserMiddleware } from "../user/user.middleware";
import { CategoryController } from "./category.controller";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation";

export class CategoryRouter {
  private categoryController: CategoryController;
  private userMiddleware: UserMiddleware;
  private appMiddleware: AppMiddleware;

  constructor(private readonly app: Express) {
    this.categoryController = new CategoryController();
    this.userMiddleware = new UserMiddleware();
    this.appMiddleware = new AppMiddleware();
  }

  config() {
    this.app.get("/category", this.categoryController.getAll);

    this.app.get(
      "/category/:categoryId",
      this.categoryController.getOne
    );

    this.app.post(
      "/category",
      this.appMiddleware.validation.bind(null, createCategorySchema),
      this.userMiddleware.auth,
      this.userMiddleware.checkRole.bind(null, UserRole.ADMIN),
      this.categoryController.create
    );

    this.app.patch(
      "/category/:categoryId",
      this.appMiddleware.validation.bind(null, updateCategorySchema),
      this.userMiddleware.auth,
      this.userMiddleware.checkRole.bind(null, [
        UserRole.COLLABORATOR,
        UserRole.ADMIN,
      ]),
      this.categoryController.update
    );
  }
}
