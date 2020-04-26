import { Router, Request, Response, NextFunction } from 'express'
import BaseController from './BaseController'
import UserService from '../services/UserService';
import { User } from '../entities/User';

export default class UserController implements BaseController {

    path = '/users'
    router = Router()
    service = new UserService()

    constructor() {
        this.service = new UserService()
        this.router.get('/', (...args) => this.index(...args))
        this.router.post('/', (...args) => this.add(...args))
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await this.service.findAll()
            response.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    async add(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await this.service.add(request.body)
            response.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }
}