import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import BaseService from "./BaseService";
import { User } from "../entities/User";
import SystemException from "../expections/SystemException";
import Messages from "../expections/Mesages";

export default class UserService implements BaseService<UserRepository> {

    repository: UserRepository

    constructor() {
        this.repository = getCustomRepository(UserRepository, process.env.NODE_ENV)
    }

    async findAll() {
        return await this.repository.find()
    }

    async findOne(id: string) {

        const user = await this.repository.findOne({ where: { id } })

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