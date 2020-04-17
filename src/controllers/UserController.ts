import { getCustomRepository } from 'typeorm';
import { Router, Request, Response, NextFunction } from 'express'
import BaseController from './BaseController'
import { UserRepository } from '../repositories/UserRepository'

export default class UserController implements BaseController {

    path = '/users'
    router = Router()

    constructor() {
        this.router.get('/', this.index)
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await getCustomRepository(UserRepository).find()
            response.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }
}