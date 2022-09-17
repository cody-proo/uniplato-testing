import { UserRole } from "@prisma/client";
import { Express } from "express";
import { UserMiddleware } from "../user/user.middleware";
import { CategoryController } from "./category.controller";

export class CategoryRouter {
  private categoryController: CategoryController;
  private userMiddleware: UserMiddleware;

  constructor(
    private readonly app: Express
  ) {
    this.categoryController =
      new CategoryController();
    this.userMiddleware =
      new UserMiddleware();
  }

  config() {
    this.app.get(
      "/category",
      this
        .categoryController
        .getAll
    );
    this.app.get(
      "/category/:categoryId",
      this
        .categoryController
        .getOne
    );
    this.app.post(
      "/category",
      this
        .userMiddleware
        .auth,
      this.userMiddleware.checkRole.bind(
        null,
        UserRole.ADMIN
      ),
      this
        .categoryController
        .create
    );
    this.app.patch(
      "/category/:categoryId",
      this
        .userMiddleware
        .auth,
      this.userMiddleware.checkRole.bind(
        null,
        [
          UserRole.COLLABORATOR,
          UserRole.ADMIN,
        ]
      ),
      this
        .categoryController
        .update
    );
  }
}
