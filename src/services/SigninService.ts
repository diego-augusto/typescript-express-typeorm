import { compare } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import { NotFoundException } from '../exceptions'
import { UserRepository } from '../repositories'
import TokenUtils from '../utils/TokenUtils'

const sign = async (email: string, password: string) =>  {
    const selectedUser = await getCustomRepository(UserRepository, process.env.NODE_ENV)
    .findOne({ where: { email } })

    if (!selectedUser) {
        throw new NotFoundException('User')
    }

    const isPasswordValid = await compare(password, selectedUser.password)

    if (!isPasswordValid) {
        throw new NotFoundException('User')
    }

    const token = TokenUtils.generateToken(selectedUser)

    return token
}

export {
    sign,
}