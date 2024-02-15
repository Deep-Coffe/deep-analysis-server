import User from "../domain/entity/User";
import Converter from "@application/helpers/Converter";
import { UserSchemaType } from "../infrastructure/schema/UserSchema";

class UserMapper {
    static toPersist(user: User): UserSchemaType {
        return {
            id: user.id.toString(),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            ...user.props,
        }
    }

    static toDomain(raw: UserSchemaType | null) {
        if (!raw) return;

        return User.createUser({
            name: raw.name,
            email: raw.email,
            password: raw.password,
            phone: raw.phone,
        },
            raw.id,
            Converter.convertDateMetadata(raw));
    }
}

export default UserMapper;