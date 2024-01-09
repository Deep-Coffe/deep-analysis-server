import Entity from "@application/entity/Entity";
import IUser from "./IUser";

class User extends Entity<IUser> {
    private constructor(props: IUser, id?: string) {
        super(props, id);
    }

    static createUser(props: IUser, id?: string) {
        return new User(props, id);
    }
}

export default User;