import IConsumable from "@modules/consumable/domain/entity/IConsumable";
import { EntitySchema } from "typeorm";

export type ConsumableSchemaType = IConsumable & {
    id: string;
    createdAt: Date;
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
        },
        updatedAt: {
            type: 'timestamp',
            nullable: true
        }
    }
});

export default consumableSchema;