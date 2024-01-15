import Consumable from "@modules/consumable/domain/entity/Consumable";
import ITreatment from "../../entity/ITreatment";

export type CreateTreatmentServiceInputDTO = ITreatment & {
    consumables: {
        quantity: number,
        consumable: Consumable,
    }[]
}