import { NextFunction, Request, Response } from 'express'
import * as UserService from '../services/UserService'

const getAll = async (request: Request, response: Response, next: NextFunction) => {
    try {

        const users = await UserService.findAll()
        response.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const getOne = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await UserService.findOne(request.params.id)
        response.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const add = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await UserService.add(request.body)
        response.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const edit = async (request: Request, response: Response, next: NextFunction) => {
    try {
        await UserService.edit(request.params.id, request.body)
        response.status(204).send()
    } catch (error) {
        next(error)
    }
}

const remove = async (request: Request, response: Response, next: NextFunction) =>  {
    try {
        await UserService.remove(request.params.id)
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
