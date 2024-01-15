import { EntitySchema } from "typeorm";
import IPlague from "@modules/plague/domain/entity/IPlague";


export type PlagueSchemaType = IPlague & {
    id: string;
    createdAt: Date,
    updatedAt?: Date
}

const plagueSchema = new EntitySchema<PlagueSchemaType>({
    name: 'plague',
    columns: {
        id: {
            type: 'uuid',
            unique: true,
            primary: true
        },
        name: {
            type: 'varchar',
            unique: true,
        },
        description: {
            type: 'text',
            nullable: true,
        },
        createdAt: {
            type: 'timestamp',
        },
        updatedAt: {
            type: 'timestamp',
            nullable: true,
        }
    }
});

export default plagueSchema;