import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import { BaseController } from "../config/controller.config"
import { config } from "../config"

export class UserController extends BaseController {

    login = async (request: Request, response: Response) => {
        const { email, password } = request.body
        const user = await this.repo.user.findUnique({ where: { email } })
        if (!user) {
            throw new Error('Invalid Email')
        }
        const isMatchPassword = await bcrypt.compare(password, user.password)
        if (!isMatchPassword) {
            throw new Error('Invalid Email')
        }
        const token = jwt.sign({ id: user.id, role: user.role }, config.SECRET_KEY, { expiresIn: config.TOKEN_EXP })
        return response.status(200).json({ token })
    }

    signup = async (request: Request, response: Response) => {
        const { email, password, bio, role } = request.body
        const isExistUser = await this.repo.user.findUnique({ where: { email } })
        if (isExistUser) {
            throw new Error('Email is already taken')
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = await this.repo.user.create({ data: { email, password: hashPassword, bio, role } })
        const token = jwt.sign({ id: user.id, role: user.role }, config.SECRET_KEY, { expiresIn: config.TOKEN_EXP })
        return response.status(201).json({ token })
    }

    profile = async (request: Request, response: Response) => {
        const user = await this.repo.user.findUnique({ where: { id: +request?.user?.id! } })
        if (!user) {
            throw new Error('User Not Found')
        }
        return response.status(200).json({ user });
    }
}