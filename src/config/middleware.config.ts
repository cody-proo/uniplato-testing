import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export class AppMiddleware {
  validation(
    schema: Joi.Schema<any>,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { error } = schema.validate(request.body, {
      abortEarly: false,
    });
    if (error?.message) {
      throw new Error(error?.message);
    }
    return next();
  }
}
