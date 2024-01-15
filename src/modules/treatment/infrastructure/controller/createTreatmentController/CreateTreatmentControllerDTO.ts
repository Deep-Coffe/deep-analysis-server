import ITreatment from "@modules/treatment/domain/entity/ITreatment";

export type CreateControllerTreatmentInputDTO = ITreatment & {
    consumables: {
        consumable: { id: string } | { name: string };
        quantity: number;
    }[]
}