import { Router, Request, Response, NextFunction } from 'express'
import BaseController from './BaseController'
import UserService from '../services/UserService';

export default class UserController implements BaseController {

    path = '/users'
    router = Router()
    service = new UserService()

    constructor() {
        this.service = new UserService()
        this.router.get('/', (...args) => this.index(...args))
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await this.service.findAll()
            response.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }
}