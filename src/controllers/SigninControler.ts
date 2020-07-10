import { NextFunction, Request, Response } from 'express'
import { UserService } from '../services'

const signin = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = await UserService.sign(request.body.email, request.body.password)
        response.status(200).json(token)
    } catch (error) {
        next(error)
    }
}

export {
    signin,
}
