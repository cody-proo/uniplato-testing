import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { BaseController } from "../config/controller.config";
import { config } from "../config";

export class UserController extends BaseController {
  // Login Action For User Route
  login = async (request: Request, response: Response) => {
    const { email, password } = request.body;
    const user = await this.repo.user.findUnique({
      where: { email },
    });
    // If User With This Email Not Exist
    if (!user) {
      throw new Error("Invalid Email");
    }
    const isMatchPassword = await bcrypt.compare(
      password,
      user.password
    );
    // If User Exist But Dosn't Match Password
    if (!isMatchPassword) {
      throw new Error("Invalid Email");
    }

    // Generate Token That Contains Role And Id
    const token = jwt.sign(
      { id: user.id, role: user.role },
      config.SECRET_KEY,
      { expiresIn: config.TOKEN_EXP }
    );

    return response.status(200).json({ token });
  };

  // Signup Action
  signup = async (request: Request, response: Response) => {
    const { email, password, bio, role } = request.body;
    // If The User With This Email Exist Throw Error
    const isExistUser = await this.repo.user.findUnique({
      where: { email },
    });
    if (isExistUser) {
      throw new Error("Email is already taken");
    }
    // Hashing Password For Security Reason
    const hashPassword = await bcrypt.hash(password, 8);
    // Insert User In Database
    const user = await this.repo.user.create({
      data: { email, password: hashPassword, bio, role },
    });
    // Generate Token That Contains Role And ID
    const token = jwt.sign(
      { id: user.id, role: user.role },
      config.SECRET_KEY,
      { expiresIn: config.TOKEN_EXP }
    );
    return response.status(201).json({ token });
  };

  // Get User Profile Information
  profile = async (request: Request, response: Response) => {
    // Get User Information Based On Authorized Request That Contains User Data Like ID and Role
    const user = await this.repo.user.findUnique({
      where: { id: +request?.user?.id! },
    });
    // If No One Exist With This ID Throw Error
    if (!user) {
      throw new Error("User Not Found");
    }
    return response.status(200).json({ user });
  };
}
