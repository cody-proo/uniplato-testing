import { NextFunction, Request, Response } from "express";
import Joi from "joi";

// Class For Implementing Global Middleware That Share across The App
export class AppMiddleware {
  // Validate Request Body
  validation(
    schema: Joi.Schema<any>,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    // Schema Come From Router That Specify Request Body What Specefic Option Have
    // Schema Make By JOI
    const { error } = schema.validate(request.body, {
      // Check All Properties
      abortEarly: false,
    });
    // If Request Body Contain At Least One Error Throw It
    if (error?.message) {
      throw new Error(error?.message);
    }
    return next();
  }
}
