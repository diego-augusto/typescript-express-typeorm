import { getCustomRepository } from 'typeorm'
import { Store } from '../entities'
import { NotFoundException } from '../exceptions'
import { StoreRepository } from '../repositories'

const findAll = async () => {
    return await getCustomRepository(StoreRepository, process.env.NODE_ENV).find()
}

const findOne = async (id: string) => {

    const store = await getCustomRepository(StoreRepository, process.env.NODE_ENV)
        .findOne({ where: { publicId: id } })

    if (store) {
        return store
    }

    throw new NotFoundException('Store')
}

const add = async (store: Store) => {
    return await getCustomRepository(StoreRepository, process.env.NODE_ENV).save(store)
}

const edit = async (id: string, store: Store) => {
    return await getCustomRepository(StoreRepository, process.env.NODE_ENV).update(id, store)
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