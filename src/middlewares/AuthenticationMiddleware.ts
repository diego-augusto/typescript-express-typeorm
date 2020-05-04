import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import UserService from '../services/UserService'
import TokenType from '../utils/TokenType'

export default class AuthenticationMiddleware {

    func = (request: Request, response: Response, next: NextFunction) => {

        try {

            const token = request.headers.authorization as string

            const decoded = verify(token, process.env.SECRET as string) as TokenType

            const userService = new UserService()

            const user = userService.findOne(decoded.id)

            request.user = user;

            next()

        } catch (error) {

        }

        next()
    }
}