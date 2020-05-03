import { Request, Response, NextFunction } from 'express'
import BaseController from './BaseController'
import UserService from '../services/UserService';

export default class UserController extends BaseController {

    service = new UserService()

    constructor() {
        super('/users')
        this.service = new UserService()
        this.router.get('/', (...args) => this.getAll(...args))
        this.router.post('/', (...args) => this.add(...args))
        this.router.get('/:id', (...args) => this.getOne(...args))
        this.router.put('/:id', (...args) => this.edit(...args))
        this.router.delete('/:id', (...args) => this.remove(...args))
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await this.service.findAll()
            response.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    async getOne(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await this.service.findOne(request.params.id)
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

    async edit(request: Request, response: Response, next: NextFunction) {
        try {
            this.service.edit(request.params.id, request.body)
            response.status(204).send()
        } catch (error) {
            next(error)
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            await this.service.remove(request.params.id)
            response.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}