import IAnalysis from "@modules/analysis/domain/entity/IAnalysis";
import { EntitySchema } from "typeorm";

export type AnalysisSchemaType = IAnalysis & {
    id: string,
    plagueId?: string,
};

const analysisSchema = new EntitySchema<AnalysisSchemaType>({
    name: 'analysis',
    columns: {
        id: {
            type: 'uuid',
            unique: true,
            primary: true,
        },
        userId: {
            type: 'uuid',
        },
        author: {
            type: String,
        },
        phoma: {
            type: 'float',
        },
        cerscospora: {
            type: 'float',
        },
        leafRust: {
            type: 'float',
        },
        miner: {
            type: 'float',
        },
        healthy: {
            type: 'float',
        },
        plagueId: {
            type: 'uuid',
            nullable: true
        },
        analyzedAt: {
            type: 'timestamp'
        },
        createdAt: {
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            createDate: true,
        },
    },
    relations: {
        userId: {
            cascade: true,
            type: 'many-to-one',
            target: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            joinColumn: { name: "userId" }
        },
        plagueId: {
            cascade: true,
            type: 'many-to-one',
            target: 'plague',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            joinColumn: { name: "plagueId" }
        }
    }
});

export default analysisSchema;