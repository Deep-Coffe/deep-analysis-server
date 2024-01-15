import { EntitySchema } from "typeorm";
import IUser from "../../domain/entity/IUser";

export type UserSchemaType = IUser & {
    id: string;
    createdAt: Date,
    updatedAt?: Date
}

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
        createdAt: {
            type: 'timestamp',
        },
        updatedAt: {
            type: 'timestamp',
            nullable: true,
        }
    },
});