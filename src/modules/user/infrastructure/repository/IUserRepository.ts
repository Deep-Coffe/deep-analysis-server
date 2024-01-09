import { IRepository } from "@application/repository/IRepository";
import User from "@modules/user/domain/entity/User";
import { UserSchemaType } from "../schema/UserSchema";

export default interface IUserRepository extends IRepository {
    findByUserId(userId: string): Promise<User | undefined>;
    save(user: UserSchemaType): Promise<void>;
}