import { EntitySchema } from "typeorm";

export type TreatmentConsumableSchemaType = {
    consumableId: string;
    treatmentId: string;
    quantity: number;
};

const treatmentConsumableSchema = new EntitySchema<TreatmentConsumableSchemaType>({
    name: 'treatment_consumable',
    columns: {
        consumableId: {
            type: 'uuid',
            primary: true,
        },
        treatmentId: {
            type: 'uuid',
            primary: true,
        },
        quantity: {
            type: 'integer',
        },
    },
    relations: {
        consumableId: {
            type: 'many-to-one',
            target: 'consumable',
            cascade: true,
            joinColumn: { name: "consumableId" }
        },
        treatmentId: {
            type: 'many-to-one',
            target: 'treatment',
            cascade: true,
            joinColumn: { name: "treatmentId" }
        }
    },
    uniques: [
        {
            name: 'UK_CONS_TREATMENT',
            columns: ['consumableId', 'treatmentId'],
        }
    ]
});

export default treatmentConsumableSchema;