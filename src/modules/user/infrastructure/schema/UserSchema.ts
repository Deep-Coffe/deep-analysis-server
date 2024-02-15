import { EntitySchema } from "typeorm";
import IUser from "../../domain/entity/IUser";
import { EntitySchemaType } from "@application/schema/EntitySchemaType";

export type UserSchemaType = EntitySchemaType<IUser> & {
    createdAt: Date;
    updatedAt?: Date;
};

export const userSchema = new EntitySchema<UserSchemaType>({
    name: 'users',
    columns: {
        id: {
            type: String,
            unique: true,
            primary: true,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        phone: {
            type: String,
            nullable: true,
        },
        password: {
            type: String,
        },
        createdAt: {
            type: Date,
            createDate: true,
        },
        updatedAt: {
            type: Date,
            updateDate: true,
        },
    },
});