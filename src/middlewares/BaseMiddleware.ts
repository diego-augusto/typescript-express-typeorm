import { Request, Response, NextFunction } from 'express'

export default interface BaseMiddleware {
    func : ( request : Request, response : Response, next : NextFunction ) => void
}