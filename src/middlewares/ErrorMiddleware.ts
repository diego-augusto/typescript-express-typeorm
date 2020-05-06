import { NextFunction, Request, Response } from 'express'
import SystemException from '../exceptions/SystemException'

export default (error: SystemException, request: Request, response: Response, next: NextFunction) => {
    response.status(error.code).json({ message: error.message })
}
