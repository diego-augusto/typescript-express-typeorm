import { NextFunction, Request, Response } from 'express'
import * as ProductService from '../services/ProductService'
import BaseController from './BaseController'

export default class ProductController extends BaseController {

    constructor() {
        super('/products')

        this.router.get('/', (...args) => this.getAll(...args))
        this.router.get('/:id', (...args) => this.getOne(...args))
        this.router.post('/', (...args) => this.add(...args))
        this.router.put('/:id', (...args) => this.edit(...args))
        this.router.delete('/:id', (...args) => this.remove(...args))
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await ProductService.findAll()
            response.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    async getOne(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await ProductService.findOne(request.params.id)
            response.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    async add(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await ProductService.add(request.body)
            response.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    async edit(request: Request, response: Response, next: NextFunction) {
        try {
            ProductService.edit(request.params.id, request.body)
            response.status(204).send()
        } catch (error) {
            next(error)
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            await ProductService.remove(request.params.id)
            response.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}