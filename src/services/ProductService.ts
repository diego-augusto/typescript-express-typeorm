import { getCustomRepository } from 'typeorm'
import { Product } from '../entities'
import { NotFoundException } from '../exceptions'
import { ProductRepository } from '../repositories'

const findAll = async () => {
    return await getCustomRepository(ProductRepository, process.env.NODE_ENV).find()
}

const findOne = async (id: string) => {

    const product = await getCustomRepository(ProductRepository, process.env.NODE_ENV)
        .findOne({ where: { publicId: id } })

    if (product) {
        return product
    }

    throw new NotFoundException('Product')
}

const add = async (product: Product) => {
    return await getCustomRepository(ProductRepository, process.env.NODE_ENV).save(product)
}

const edit = async (id: string, product: Product) => {
    return await getCustomRepository(ProductRepository, process.env.NODE_ENV).update(id, product)
}

const remove = async (id: string) => {
    return await getCustomRepository(ProductRepository, process.env.NODE_ENV).delete(id)
}

export {
    findAll,
    findOne,
    add,
    edit,
    remove
}
