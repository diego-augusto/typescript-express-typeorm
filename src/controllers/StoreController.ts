import { NextFunction, Request, Response } from 'express'
import * as StoreService from '../services/StoreService'

const getAll =  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await StoreService.findAll()
        response.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const getOne = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await StoreService.findOne(request.params.id)
        response.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const add = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await StoreService.add(request.body)
        response.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const edit = async (request: Request, response: Response, next: NextFunction) => {
    try {
        StoreService.edit(request.params.id, request.body)
        response.status(204).send()
    } catch (error) {
        next(error)
    }
}

const remove =  async (request: Request, response: Response, next: NextFunction) =>  {
    try {
        await StoreService.remove(request.params.id)
        response.status(204).send()
    } catch (error) {
        next(error)
    }
}

export {
    getAll,
    getOne,
    add,
    edit,
    remove
}