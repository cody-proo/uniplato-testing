import { Express } from "express";
import { AppMiddleware } from "../config/middleware.config";
import { UserController } from "./user.controller";
import { UserMiddleware } from "./user.middleware";
import { loginSchema, signupSchema } from "./user.validation";

export class UserRouter {
  private userMiddleware: UserMiddleware;
  private userController: UserController;
  private appMiddleware: AppMiddleware;

  constructor(private readonly app: Express) {
    this.userMiddleware = new UserMiddleware();
    this.userController = new UserController();
    this.appMiddleware = new AppMiddleware();
  }

  config() {
    this.app.post(
      "/user/login",
      this.appMiddleware.validation.bind(null, loginSchema),
      this.userController.login
    );
    this.app.post(
      "/user/signup",
      this.appMiddleware.validation.bind(null, signupSchema),
      this.userController.signup
    );
    this.app.get(
      "/user",
      this.userMiddleware.auth,
      this.userController.profile
    );
  }
}
