import { Express } from 'express';
import { UserController } from './user.controller';

export class UserRouter {
    constructor(private readonly app: Express, private readonly userController: UserController) { }

    config() {
        this.app.post('/user/login', this.userController.login)
        this.app.post('/user/signup', this.userController.signup)
        this.app.get('/user', this.userController.profile)
    }
}