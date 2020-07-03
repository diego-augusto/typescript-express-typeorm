import { compare } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import { User } from '../entities/User'
import Messages from '../exceptions/Messages'
import SystemException from '../exceptions/SystemException'
import { UserRepository } from '../repositories/UserRepository'
import TokenUtils from '../utils/TokenUtils'

const findAll = async () =>  {
    return await getCustomRepository(UserRepository, process.env.NODE_ENV)
    .find()
}

const findOne = async (id: string) =>  {

    const user = await getCustomRepository(UserRepository, process.env.NODE_ENV)
    .findOne({ where: { publicId: id } })

    if (user) {
        return user
    }

    throw new SystemException(Messages.NOT_FOUND.message, Messages.NOT_FOUND.code)
}

const add = async (user: User) => {
    return await getCustomRepository(UserRepository, process.env.NODE_ENV).save(user)
}

const edit =  async (id: string, user: User) =>  {
    return await getCustomRepository(UserRepository, process.env.NODE_ENV).update(id, user)
}

const remove = async (id: string) =>  {
    return await getCustomRepository(UserRepository, process.env.NODE_ENV).delete(id)
}

const signup = async (user: User) => {
    const newUser = await getCustomRepository(UserRepository, process.env.NODE_ENV).save(user)
    const token = TokenUtils.generateToken(newUser)
    return {
        id: newUser.publicId,
        token
    }
}

const sign = async (email: string, password: string) =>  {
    const selectedUser = await getCustomRepository(UserRepository, process.env.NODE_ENV)
    .findOne({ where: { email } })

    if (!selectedUser) {
        throw new SystemException(Messages.WRONG_SIGNIN.message, Messages.WRONG_SIGNIN.code)
    }

    const isPasswordValid = await compare(password, selectedUser.password)

    if (!isPasswordValid) {
        throw new SystemException(Messages.WRONG_SIGNIN.message, Messages.WRONG_SIGNIN.code)
    }

    const token = TokenUtils.generateToken(selectedUser)

    return token
}

export {
    findAll,
    findOne,
    add,
    edit,
    signup,
    sign,
    remove
}