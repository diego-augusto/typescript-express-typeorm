import { Request, Response, NextFunction } from 'express'
import BaseMiddleware from './BaseMiddleware'
import SystemException from '../expections/SystemException'

export default class ErrorMiddleware implements BaseMiddleware {

    func = (error: SystemException, request: Request, response: Response, next: NextFunction) => {
        console.log('Request logged:', request.method, request.path)

        response.status(error.code).json({ message : error.message})
    }
}