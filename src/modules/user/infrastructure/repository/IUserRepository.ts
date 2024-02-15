import { IRepository } from "@application/repository/IRepository";
import User from "@modules/user/domain/entity/User";
import { UserSchemaType } from "../schema/UserSchema";

export default interface IUserRepository extends IRepository {
    save(user: UserSchemaType): Promise<void>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
}