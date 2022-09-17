import { UserRouter } from '../user/user.route';
import { Express } from "express";
import { CategoryRouter } from "../category/category.route";
import { CategoryController } from "../category/category.controller";
import { UserController } from '../user/user.controller';

export class AppRoutes {
  constructor(private readonly app: Express) { }

  config() {
    new CategoryRouter(this.app, new CategoryController()).config();
    new UserRouter(this.app, new UserController()).config()
  }
}
