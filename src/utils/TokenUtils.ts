import { User } from "../entities/User";
import TokenType from "./TokenType";
import { sign } from "jsonwebtoken";

export default abstract class TokenUtils {

    static generateToken(user: User) {

        const payload: TokenType = {
            id: user.publicId,
            name: user.name,
            email: user.email
        }

        const token = sign(payload, process.env.SECRET as string);

        return { token }
    }
}