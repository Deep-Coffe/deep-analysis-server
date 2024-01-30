import IUserRepository from "@modules/user/infrastructure/repository/IUserRepository";
import { inject, injectable } from "tsyringe";
import User from "../../entity/User";
import UserMapper from "@modules/user/common/UserMapper";

@injectable()
class CreateUserService {
    constructor(@inject('UserRepository') private readonly _userRepository: IUserRepository) { }

    public async execute(data: { userId: string }) {
        const user = User.createUser(data);

        await this._userRepository.save(UserMapper.toPersist(user));
    }
}

export default CreateUserService;