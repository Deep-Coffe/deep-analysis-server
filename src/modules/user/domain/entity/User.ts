import Entity from "@application/entity/Entity";
import IUser from "./IUser";
import { DateMetadata } from "@application/entity/DateMetadata";

class User extends Entity<IUser> {
    private constructor(props: IUser, id?: string, date?: DateMetadata) {
        super(props, id, date);
    }

    static createUser(props: IUser, id?: string, date?: DateMetadata) {
        return new User(props, id, date);
    }
}

export default User;