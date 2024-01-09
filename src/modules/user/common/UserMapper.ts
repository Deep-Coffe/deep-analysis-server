import { EntitySchemaType } from "@application/schema/EntitySchemaType";
import IUser from "../domain/entity/IUser";
import User from "../domain/entity/User";

class UserMapper {
    static toPersist(user: User): EntitySchemaType<IUser> {
        return {
            id: user.id.toString(),
            userId: user.props.userId,
        }
    }

    static toDomain(raw: Record<string, unknown> | null) {
        if (!raw) return;

        return User.createUser({
            userId: raw.userId as string,
        }, raw.id as string);
    }
}

export default UserMapper;