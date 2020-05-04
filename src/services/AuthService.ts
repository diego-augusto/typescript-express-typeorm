import { User } from "../entities/User";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { UserRepository } from "../repositories/UserRepository";
import { getCustomRepository } from "typeorm";
import SystemException from "../exceptions/SystemException";
import Messages from "../exceptions/Messages";

export default class AuthService {

    private repository: UserRepository

    constructor() {
        this.repository = getCustomRepository(UserRepository, process.env.NODE_ENV)
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
            id: user.id,
            name: user.name,
            email: user.email
        }

        const token = sign(payload, process.env.SECRET as string);

        return token
    }
}