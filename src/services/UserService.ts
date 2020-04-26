import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import BaseService from "./BaseService";
import { User } from "../entities/User";

export default class UserService implements BaseService<UserRepository> {

    repository: UserRepository

    constructor() {
        this.repository = getCustomRepository(UserRepository, process.env.NODE_ENV)
    }

    async findAll() {
        return await this.repository.find()
    }

    async add(user: User) {
        return await this.repository.save(user)
    }
}