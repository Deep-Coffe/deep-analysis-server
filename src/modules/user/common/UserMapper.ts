import User from "../domain/entity/User";
import Converter from "@application/helpers/Converter";
import { UserSchemaType } from "../infrastructure/schema/UserSchema";

class UserMapper {
    static toPersist(user: User): UserSchemaType {
        return {
            id: user.id.toString(),
            userId: user.props.userId,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }

    static toDomain(raw: UserSchemaType | null) {
        if (!raw) return;

        return User.createUser({
            userId: raw.userId as string,
        },
            raw.id as string,
            Converter.convertDateMetadata(raw));
    }
}

export default UserMapper;