import HashProvider from "@common/providers/HashProvider";
import IUserRepository from "@modules/user/infrastructure/repository/IUserRepository";
import { inject, injectable } from "tsyringe";
import { CreateUserServiceInputDTO } from "./CreateUserServiceDTO";
import User from "../../entity/User";
import BadRequestError from "@application/error/BadRequestError";
import UserMapper from "@modules/user/common/UserMapper";

@injectable()
class CreateUserService {
    constructor(@inject('UserRepository') private readonly _userRepository: IUserRepository,
        private readonly _hashProvider: HashProvider) { }

    public async execute(data: CreateUserServiceInputDTO) {
        const userExist = await this._userRepository.findByEmail(data.email);

        if (userExist) throw new BadRequestError('Email já existe!');

        const passwordHashed = await this._hashProvider.generateHash(data.password);

        const user = User.createUser({
            name: data.name,
            email: data.email,
            password: passwordHashed,
            phone: data.phone,
        });

        await this._userRepository.save(UserMapper.toPersist(user));

        return user;
    }
}

export default CreateUserService;