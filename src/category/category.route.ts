import { Express } from "express";
import { CategoryController } from "./category.controller";

export class CategoryRouter {
  constructor(
    private readonly app: Express,
    private readonly categoryController: CategoryController
  ) { }

  config() {
    this.app.get("/category", this.categoryController.getAll);
    this.app.get("/category/:categoryId", this.categoryController.getOne);
    this.app.post("/category", this.categoryController.create);
    this.app.patch("/category/:categoryId", this.categoryController.update);
  }
}
