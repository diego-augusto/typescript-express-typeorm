import { NextFunction, Request, Response } from 'express'
import { SigninService } from '../services'

const signin = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = await SigninService.sign(request.body.email, request.body.password)
        response.status(200).json(token)
    } catch (error) {
        next(error)
    }
}

export {
    signin,
}
