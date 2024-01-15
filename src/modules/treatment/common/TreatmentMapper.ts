import Treatment from "../domain/entity/Treatment";
import TreatmentConsumable from "../domain/entity/TreatmentConsumable";
import { TreatmentConsumableSchemaType } from "../infrastructure/schema/treatmentConsumableSchema";
import { TreatmentSchemaType } from "../infrastructure/schema/treatmentSchema";

export default class TreatmentMapper {
    static toPersist(treatment: Treatment): TreatmentSchemaType {
        return {
            id: treatment.id.toString(),
            ...treatment.props,
            createdAt: treatment.createdAt,
            updatedAt: treatment.updatedAt
        }
    }

    static treatmentConsumableToPersist(treatmentConsumable: TreatmentConsumable): TreatmentConsumableSchemaType[] {
        return treatmentConsumable.consumables.map((consumable) => {
            return {
                treatmentId: treatmentConsumable.treatment.id.toString(),
                consumableId: consumable.id.toString(),
                quantity: consumable.quantity ?? 0,
            }
        })
    }
}