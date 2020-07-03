import { NextFunction, Request, Response } from 'express'
import * as UserService from '../services/UserService'

export default class AuthController {

    constructor() {
        this.signin = this.signin.bind(this)
        this.signup = this.signup.bind(this)
    }

    async signin(request: Request, response: Response, next: NextFunction) {
        try {
            const token = await UserService.sign(request.body.email, request.body.password)
            response.status(200).json(token)
        } catch (error) {
            next(error)
        }
    }

    async signup(request: Request, response: Response, next: NextFunction) {
        try {
            const token = await UserService.signup(request.body)
            response.status(200).json(token)
        } catch (error) {
            next(error)
        }
    }
}