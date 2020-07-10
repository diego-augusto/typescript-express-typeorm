import { getCustomRepository } from 'typeorm'
import { User } from '../entities'
import { NotFoundException } from '../exceptions'
import { UserRepository } from '../repositories'

const findAll = async () => {
    return await getCustomRepository(UserRepository, process.env.NODE_ENV)
        .find()
}

const findOne = async (id: string) => {

    const user = await getCustomRepository(UserRepository, process.env.NODE_ENV)
        .findOne({ where: { publicId: id } })

    if (user) {
        return user
    }

    throw new NotFoundException('User')
}

const add = async (user: User) => {
    return await getCustomRepository(UserRepository, process.env.NODE_ENV).save(user)
}

const edit = async (id: string, user: User) => {
    return await getCustomRepository(UserRepository, process.env.NODE_ENV).update(id, user)
}

const remove = async (id: string) => {
    return await getCustomRepository(UserRepository, process.env.NODE_ENV).delete(id)
}

export {
    findAll,
    findOne,
    edit,
    remove
}