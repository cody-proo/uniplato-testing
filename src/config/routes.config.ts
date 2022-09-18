import { UserRouter } from "../user/user.route";
import { Express, NextFunction, Request, Response } from "express";
import { CategoryRouter } from "../category/category.route";

// Class For Configure Application Routes
export class AppRoutes {
  constructor(private readonly app: Express) {}

  // This Method Implement Configuring Routes For Serving Request
  config() {
    // Category Routes -> /category
    new CategoryRouter(this.app).config();
    // User Routes -> /user
    new UserRouter(this.app).config();
    // Error Handler
    this.app.use(
      (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        console.log(error.message);
      }
    );
  }
}
