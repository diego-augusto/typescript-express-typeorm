import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { InvalidParameterException, NotFoundException, UnauthorizedException } from '../exceptions'
import * as UserService from '../services/UserService'
import TokenType from '../utils/TokenType'

export default async (request: Request, response: Response, next: NextFunction) => {

    try {

        const token = request.headers.authorization as string

        if (!token) {
            throw new UnauthorizedException()
        }

        const decoded = verify(token, process.env.SECRET as string) as TokenType

        if (!decoded) {
            throw new InvalidParameterException('token')
        }

        const user = await UserService.findOne(decoded.id)

        if (!user) {
            throw new NotFoundException('user')
        }

        request.user = user

        next()

    } catch (error) {
        next(error)
    }
}
