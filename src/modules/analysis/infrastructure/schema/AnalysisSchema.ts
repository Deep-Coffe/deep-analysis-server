import IAnalysis from "@modules/analysis/domain/entity/IAnalysis";
import { EntitySchema } from "typeorm";

export type AnalysisSchemaType = IAnalysis & {
    id: string,
    plagueId?: string,
    createdAt: Date;
    updatedAt?: Date;
};

const analysisSchema = new EntitySchema<AnalysisSchemaType>({
    name: 'analysis',
    columns: {
        id: {
            type: 'uuid',
            unique: true,
            primary: true,
        },
        name: {
            type: 'varchar'
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
        },
        attachmentId: {
            type: 'uuid',
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
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            joinColumn: { name: "plagueId" }
        },
        attachmentId: {
            cascade: true,
            type: 'many-to-one',
            target: 'attachment',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            joinColumn: { name: "attachmentId" }
        }
    }
});

export default analysisSchema;