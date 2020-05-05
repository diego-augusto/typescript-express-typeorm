import { getCustomRepository } from "typeorm";
import BaseService from "./BaseService";
import { User } from "../entities/User";
import SystemException from "../exceptions/SystemException";
import Messages from "../exceptions/Messages";
import { StoreRepository } from "../repositories/StoreRepository";

export default class StoreService extends BaseService<StoreRepository> {

    constructor() {
        super()
        this.repository = getCustomRepository(StoreRepository, process.env.NODE_ENV)
    }

    async findAll() {
        return await this.repository.find()
    }

    async findOne(id: string) {

        const user = await this.repository.findOne({ where: { publicId: id } })

        if (user) {
            return user
        }

        throw new SystemException(Messages.NOT_FOUND.message, Messages.NOT_FOUND.code)
    }

    async add(user: User) {
        return await this.repository.save(user)
    }

    async edit(id: string, user: User) {
        return await this.repository.update(id, user)
    }

    async remove(id: string) {
        return await this.repository.delete(id)
    }
}