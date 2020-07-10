
import { getCustomRepository } from 'typeorm'
import { User } from '../entities'
import { UserRepository } from '../repositories'
import TokenUtils from '../utils/TokenUtils'

const signup = async (user: User) => {
    const newUser = await getCustomRepository(UserRepository, process.env.NODE_ENV).save(user)
    const token = TokenUtils.generateToken(newUser)
    return {
        id: newUser.publicId,
        token
    }
}

export {
    signup,
}