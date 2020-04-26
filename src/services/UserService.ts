import { UserRepository } from "../repositories/UserRepository";
import { getCustomRepository } from "typeorm";
import BaseService from "./BaseService";

export default class UserService implements BaseService<UserRepository> {

    repository: UserRepository

    constructor() {
        this.repository = getCustomRepository(UserRepository, "development")
    }

    async findAll() {
        return await this.repository.find()
    }

    async finById(id: number) {
        return await this.repository.findOne({ where: { id: id } })
    }
}