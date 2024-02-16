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

    public verify(tokenRaw?: string) {
        if (!tokenRaw) throw new AuthenticateError('Must pass auth token');

        const [, token] = tokenRaw.split(' ')

        try {
            const sub = verify(token, AuthConfig.publicKey(), { algorithms: ['RS256'] }) as JwtPayload;
            return sub.id
        } catch (err) {
            throw new AuthenticateError('Token invalid');
        }

    }
}

export default AuthProvider;