import IUserRepository from "@modules/user/infrastructure/repository/IUserRepository";
import { inject, injectable } from "tsyringe";
import User from "../../entity/User";
import UserMapper from "@modules/user/common/UserMapper";
import { cache } from "@common/cache/Cache";
import UserRepository from "@modules/user/infrastructure/repository/UserRepository";

@injectable()
class FindOrCreateService {
    constructor(@inject(UserRepository) private readonly _userRepository: IUserRepository) { }

    public async execute(userId: string) {
        const userCached = cache.get(userId);

        if (userCached) return userCached as string;

        const userExits = await this._userRepository.findByUserId(userId);

        if (userExits) {
            cache.set(userId, userExits.id.toString());
            return userExits.id.toString();
        }

        const user = User.createUser({ userId });

        await this._userRepository.save(UserMapper.toPersist(user));

        cache.set(userId, user.id.toString());

        return user.id.toString();
    }
}

export default FindOrCreateService;