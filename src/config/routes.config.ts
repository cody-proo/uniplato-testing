import { UserRouter } from "../user/user.route";
import { Express } from "express";
import { CategoryRouter } from "../category/category.route";

export class AppRoutes {
  constructor(private readonly app: Express) {}

  config() {
    new CategoryRouter(this.app).config();
    new UserRouter(this.app).config();
  }
}
