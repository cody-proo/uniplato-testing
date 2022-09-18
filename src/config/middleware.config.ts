import { NextFunction, Request, Response } from "express";
import Joi from "joi";

// Class For Implementing Global Middleware That Share across The App
export class AppMiddleware {
  // Validate Request Body
  validation(
    schema: Joi.Schema<any>,
    type: "body" | "param",
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    // Schema Come From Router That Specify Request Body What Specefic Option Have
    // Schema Make By JOI
    const { error } = schema.validate(
      type === "body" ? request.body : request.params,
      {
        // Check All Properties
        abortEarly: false,
      }
    );
    // If Request Body Contain At Least One Error Throw It
    if (error?.message) {
      return response.status(400).json({
        message: "BadRequestException",
        messages: error?.message,
      });
    }
    return next();
  }
}
