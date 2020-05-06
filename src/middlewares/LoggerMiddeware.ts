import { NextFunction, Request, Response } from 'express'

export default class LoggerMiddleware {

    func = (request: Request, response: Response, next: NextFunction) => {
        // console.log('Request logged:', request.method, request.path)
        next()
    }
}