import { Repository } from "typeorm";
import { UserSchemaType, userSchema } from "../schema/UserSchema";
import IUserRepository from "./IUserRepository";
import RepositoryFactory from "@application/repository/RepositoryFactory";
import UserMapper from "@modules/user/common/UserMapper";

@RepositoryFactory.register(userSchema)
class UserRepository implements IUserRepository {
    private readonly _ormRepository: Repository<UserSchemaType>

    constructor(repository: Repository<UserSchemaType>) {
        this._ormRepository = repository;
    }

    public async save(user: UserSchemaType): Promise<void> {
        await this._ormRepository.insert(user);
    }

    public async findByUserId(userId: string) {
        const userData = await this._ormRepository.findOne({
            where: {
                userId
            }
        });

        return UserMapper.toDomain(userData);
    }
}

export default UserRepository