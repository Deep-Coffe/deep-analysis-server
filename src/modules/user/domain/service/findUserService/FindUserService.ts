import IUserRepository from "@modules/user/infrastructure/repository/IUserRepository";
import { inject, injectable } from "tsyringe";
import { cache } from "@common/cache/Cache";

@injectable()
class FindUserService {
    constructor(@inject('UserRepository') private readonly _userRepository: IUserRepository) { }

    public async execute(userId: string) {
        const userCached = cache.get(userId);

        if (userCached) return userCached as string;

        const userExits = await this._userRepository.findByUserId(userId);

        cache.set(userId, userExits?.id.toString());
        return userExits?.id.toString() as string;

    }
}

export default FindUserService;