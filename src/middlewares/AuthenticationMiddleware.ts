import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import UserService from '../services/UserService'
import TokenType from '../utils/TokenType'
import SystemException from "../exceptions/SystemException";
import Messages from "../exceptions/Messages";

export default async (request: Request, response: Response, next: NextFunction) => {

    try {

        const token = request.headers.authorization as string

        if (!token) {
            throw new SystemException(Messages.UNAUTHORIZED.message, Messages.UNAUTHORIZED.code)
        }

        const decoded = verify(token, process.env.SECRET as string) as TokenType

        if (!decoded) {
            throw new SystemException(Messages.UNAUTHORIZED.message, Messages.UNAUTHORIZED.code)
        }

        const userService = new UserService()

        const user = await userService.findOne(decoded.id)

        if (!user) {
            throw new SystemException(Messages.UNAUTHORIZED.message, Messages.UNAUTHORIZED.code)
        }

        request.user = user;

        next()

    } catch (error) {
        next(error)
    }
}
