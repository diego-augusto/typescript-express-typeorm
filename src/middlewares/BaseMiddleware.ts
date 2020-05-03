import { Request, Response, NextFunction } from 'express'
import SystemException from '../expections/SystemException';

export default interface BaseMiddleware {
    func: (error: SystemException, request: Request, response: Response, next: NextFunction) => void
}