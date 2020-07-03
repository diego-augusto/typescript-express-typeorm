import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import Messages from '../exceptions/Messages'
import SystemException from '../exceptions/SystemException'
import * as UserService from '../services/UserService'
import TokenType from '../utils/TokenType'

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

        const user = await UserService.findOne(decoded.id)

        if (!user) {
            throw new SystemException(Messages.UNAUTHORIZED.message, Messages.UNAUTHORIZED.code)
        }

        request.user = user

        next()

    } catch (error) {
        next(error)
    }
}
