import { Request, Response, NextFunction } from 'express'

export default class LoggerMiddleware {
    
    func = (request : Request, response : Response, next : NextFunction ) => {
        console.log('Request logged:', request.method, request.path)
        next()
    }
}