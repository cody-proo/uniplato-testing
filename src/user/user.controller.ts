import { Request, Response } from "express"
import { BaseController } from "../config/controller.config"

export class UserController extends BaseController {

    login = (request: Request, response: Response) => {
        return response.json({ message: 'LOGIN' })
    }

    signup = (request: Request, response: Response) => {
        return response.json({ message: 'Signup' })
    }

    profile = (request: Request, response: Response) => {
        return response.json({ message: 'profile' })
    }
}