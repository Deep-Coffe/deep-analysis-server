import { Repository } from "typeorm";
import { UserSchemaType, userSchema } from "../schema/UserSchema";
import IUserRepository from "./IUserRepository";
import RepositoryFactory from "@application/repository/RepositoryFactory";
import UserMapper from "@modules/user/common/UserMapper";
import User from "@modules/user/domain/entity/User";

@RepositoryFactory.register(userSchema)
class UserRepository implements IUserRepository {
    private readonly _ormRepository: Repository<UserSchemaType>

    constructor(repository: Repository<UserSchemaType>) {
        this._ormRepository = repository;
    }

    public async save(user: UserSchemaType): Promise<void> {
        await this._ormRepository.save(user);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this._ormRepository.findOne({
            where: {
                email
            }
        });

        return UserMapper.toDomain(user);
    }

    public async findById(id: string) {
        const userData = await this._ormRepository.findOne({
            where: {
                id
            }
        });

        return UserMapper.toDomain(userData);
    }
}

export default UserRepository