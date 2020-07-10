import { NextFunction, Request, Response } from 'express'
import { UserService } from '../services'

const signup = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = await UserService.signup(request.body)
        response.status(200).json(token)
    } catch (error) {
        next(error)
    }
}

export {
    signup
}
