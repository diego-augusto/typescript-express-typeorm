import { Request, Response, NextFunction } from 'express'
import AuthService from '../services/AuthService';

export default class SigninController {

    service: AuthService

    constructor() {
        this.service = new AuthService()
        this.signin = this.signin.bind(this)
    }

    async signin(request: Request, response: Response, next: NextFunction) {
        try {
            const token = await this.service.sign(request.body.email, request.body.password)
            response.status(200).json({ token: token })
        } catch (error) {
            next(error)
        }
    }
}