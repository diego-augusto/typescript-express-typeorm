import { Request, Response, NextFunction } from 'express'
import BaseMiddleware from './BaseMiddleware'
import SystemException from '../exceptions/SystemException'

export default class LoggerMiddleware implements BaseMiddleware {
    
    func = ( error : SystemException, request : Request, response : Response, next : NextFunction ) => {
        console.log('Request logged:', request.method, request.path)
        next()
    }
}