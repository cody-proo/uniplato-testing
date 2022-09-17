import { Express } from 'express';
import { UserController } from './user.controller';
import { UserMiddleware } from './user.middleware';

export class UserRouter {
    private userMiddleware: UserMiddleware
    private userController: UserController

    constructor(private readonly app: Express) {
        this.userMiddleware = new UserMiddleware();
        this.userController = new UserController()
    }

    config() {
        this.app.post('/user/login', this.userController.login)
        this.app.post('/user/signup', this.userController.signup)
        this.app.get('/user', this.userMiddleware.auth, this.userController.profile)
    }
}