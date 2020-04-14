import { Router, Request, Response, NextFunction } from 'express'
import { BaseController } from './BaseController'

export default class UserController implements BaseController {

    path = '/users'
    router = Router()

    constructor(){
        this.router.get('/', this.index)
    }

    index = (request : Request, response : Response, next : NextFunction) => {

        try {
            response.send({
                user :{
                    id: 1,
                    name : 'Diego'
                }
            })
        } catch (error) {
                next(error)
        }
    }
}