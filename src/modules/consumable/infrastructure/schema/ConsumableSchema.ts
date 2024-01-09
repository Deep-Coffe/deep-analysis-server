import IConsumable from "@modules/consumable/domain/entity/IConsumable";
import { EntitySchema } from "typeorm";

export type ConsumableSchemaType = IConsumable & {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const consumableSchema = new EntitySchema<ConsumableSchemaType>({
    name: 'consumable',
    columns: {
        id: {
            type: 'uuid',
            unique: true,
            primary: true,
        },
        name: {
            type: String,
        },
        createdAt: {
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            createDate: true,
        },
        updatedAt: {
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            nullable: true,
            updateDate: true,
        }
    }
});

export default consumableSchema;