import { EntitySchema } from "typeorm";
import IUser from "../../domain/entity/IUser";
import { EntitySchemaType } from "@application/schema/EntitySchemaType";

export type UserSchemaType = EntitySchemaType<IUser>;

export const userSchema = new EntitySchema<UserSchemaType>({
    name: 'users',
    columns: {
        id: {
            type: 'uuid',
            unique: true,
            primary: true,
        },
        userId: {
            type: 'uuid',
            unique: true,
        },
    },
});