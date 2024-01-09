import AuthenticateError from "@application/error/AuthenticateError";
import AuthConfig from "@config/AuthConfig";
import User from "@modules/user/domain/entity/User";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { injectable } from "tsyringe";

@injectable()
class AuthProvider {
    public sing(user: User) {
        return sign({
            id: user.id.toString(),
        }, AuthConfig.privateKey(), { algorithm: 'RS256', expiresIn: '7d' });
    }

    public verify(token?: string) {
        if (!token) throw new AuthenticateError('Must pass auth token');

        try {
            const sub = verify(token, AuthConfig.publicKey(), { algorithms: ['RS256'] }) as JwtPayload;
            return sub.id as string;
        } catch (err) {
            throw new AuthenticateError('Token invalid');
        }

    }
}

export default AuthProvider;