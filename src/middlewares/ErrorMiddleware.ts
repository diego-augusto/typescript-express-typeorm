import { Request, Response, NextFunction } from 'express'
import BaseMiddleware from './BaseMiddleware'
import SystemException from '../exceptions/SystemException'

export default class ErrorMiddleware {

    func = (error: SystemException, request: Request, response: Response, next: NextFunction) => {
        response.status(error.code).json({ message : error.message})
    }
}