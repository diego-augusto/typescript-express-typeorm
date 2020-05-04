import { Request, Response, NextFunction } from 'express'
import UserService from '../services/UserService';

export default class AuthController {

    service: UserService

    constructor() {
        this.service = new UserService()
        this.signin = this.signin.bind(this)
        this.signup = this.signup.bind(this)
    }

    async signin(request: Request, response: Response, next: NextFunction) {
        try {
            const token = await this.service.sign(request.body.email, request.body.password)
            response.status(200).json({ token: token })
        } catch (error) {
            next(error)
        }
    }

    async signup(request: Request, response: Response, next: NextFunction) {
        try {
            const token = await this.service.signup(request.body)
            response.status(200).json({ token: token })
        } catch (error) {
            next(error)
        }
    }
}