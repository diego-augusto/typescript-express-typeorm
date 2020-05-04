import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import BaseService from "./BaseService";
import { User } from "../entities/User";
import SystemException from "../exceptions/SystemException";
import Messages from "../exceptions/Messages";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

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

    async signup(user: User) {
        const newUser = await this.repository.save(user)
        const token = this.generateToken(newUser)
        return {
            id: newUser.publicId,
            token: token
        }
    }

    async sign(email: string, password: string) {
        const selectedUser = await this.repository.findOne({ where: { email: email } })

        if (!selectedUser) {
            throw new SystemException(Messages.WRONG_SIGNIN.message, Messages.WRONG_SIGNIN.code)
        }

        const isPasswordValid = await compare(password, selectedUser.password)

        if (!isPasswordValid) {
            throw new SystemException(Messages.WRONG_SIGNIN.message, Messages.WRONG_SIGNIN.code)
        }

        const token = this.generateToken(selectedUser)

        return token
    }

    private generateToken(user: User) {

        const payload = {
            id: user.publicId,
            name: user.name,
            email: user.email
        }

        const token = sign(payload, process.env.SECRET as string);

        return { token }
    }
}