import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IRequestUser } from "../custom";

// Middleware That Interact Directly With User
export class UserMiddleware {
  // Check Authentication - Check Based On Token That Set On Header
  auth(request: Request, response: Response, next: NextFunction) {
    const token = request.get("authorization")?.split("Bearer ")[1];
    if (!token) {
      throw new Error("Unauthorization");
    }
    const decodedToken = jwt.decode(token) as JwtPayload &
      IRequestUser;
    if (decodedToken.exp! * 1000 < Date.now()) {
      throw new Error("Unauthorization");
    }
    request.user = { id: decodedToken.id, role: decodedToken.role };
    return next();
  }

  // Check User Role For Protected Route Based On User Information On The Request
  checkRole(
    type: UserRole | UserRole[],
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const userRole = request?.user?.role!;
    const arrayCheckingRole =
      Array.isArray(type) && (type as UserRole[]).includes(userRole);
    const stringCheckingRole =
      typeof type === "string" && userRole === type;
    if (!arrayCheckingRole && !stringCheckingRole)
      throw new Error("Invalid Permission");
    return next();
  }
}
