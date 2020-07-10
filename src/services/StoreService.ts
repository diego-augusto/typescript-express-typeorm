import { getCustomRepository } from 'typeorm'
import { User } from '../entities/User'
import { NotFoundException } from '../exceptions/NotFoundException'
import { StoreRepository } from '../repositories/StoreRepository'

const findAll = async () => {
    return await getCustomRepository(StoreRepository, process.env.NODE_ENV).find()
}

const findOne = async (id: string) => {

    const user = await getCustomRepository(StoreRepository, process.env.NODE_ENV)
        .findOne({ where: { publicId: id } })

    if (user) {
        return user
    }

    throw new NotFoundException('Store')
}

const add = async (user: User) => {
    return await getCustomRepository(StoreRepository, process.env.NODE_ENV).save(user)
}

const edit = async (id: string, user: User) => {
    return await getCustomRepository(StoreRepository, process.env.NODE_ENV).update(id, user)
}

const remove = async (id: string) => {
    return await getCustomRepository(StoreRepository, process.env.NODE_ENV).delete(id)
}

export {
    findAll,
    findOne,
    add,
    edit,
    remove
}