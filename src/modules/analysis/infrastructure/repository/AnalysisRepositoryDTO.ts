import { TreatmentSchemaType } from "@modules/treatment/infrastructure/schema/treatmentSchema";
import { AnalysisSchemaType } from "../schema/AnalysisSchema";
import { ConsumableSchemaType } from "@modules/consumable/infrastructure/schema/ConsumableSchema";

export type ListAnalysisOutputDTO = Omit<AnalysisSchemaType, 'createdAt'> & {
    id: string;
    plague: {
        id: string,
        name: string
    }
    treatments: Array<Omit<TreatmentSchemaType, 'plagueId' | 'createdAt'> & {
        consumables: {
            quantity: number,
            consumable: Omit<ConsumableSchemaType, 'createdAt'>,
        }[]
    }>;
}