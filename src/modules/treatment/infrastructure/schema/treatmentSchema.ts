import ITreatment from "@modules/treatment/domain/entity/ITreatment";
import { EntitySchema } from "typeorm";

export type TreatmentSchemaType = ITreatment & {
    id: string;
    createdAt: Date,
    updatedAt?: Date
}

const treatmentSchema = new EntitySchema<TreatmentSchemaType>({
    name: 'treatment',
    columns: {
        id: {
            type: 'uuid',
            unique: true,
            primary: true,
        },
        name: {
            type: String,
            nullable: true,
        },
        plagueId: {
            type: 'uuid',
        },
        createdAt: {
            type: 'timestamp'
        },
        updatedAt: {
            type: 'timestamp',
            nullable: true,
        }
    },
    relations: {
        plagueId: {
            cascade: true,
            type: 'many-to-one',
            target: 'plague',
            joinColumn: { name: 'plagueId' }
        }
    }
});

export default treatmentSchema;