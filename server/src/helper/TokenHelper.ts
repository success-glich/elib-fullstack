import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config/config';

export default class TokenHelper {

    static async generateToken(payload: any, option: SignOptions = { expiresIn: "7d" }) {
        try {
            const token = jwt.sign(payload, config.jwtSecret as string, { ...option });
            return token;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("An error occurred while generating token.")

        }
    }
    static async verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, config.jwtSecret as string);
            return decoded;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("An error occurred while verifying token.")
        }
    }


}