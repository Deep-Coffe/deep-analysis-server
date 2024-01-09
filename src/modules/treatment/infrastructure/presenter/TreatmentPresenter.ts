import TreatmentConsumable from "@modules/treatment/domain/entity/TreatmentConsumable";

export default class TreatmentPresenter {
    static treatmentConsumableOutput(treatmentConsumable: TreatmentConsumable) {
        return {
            ...treatmentConsumable.treatment.presenter(),
            consumables: treatmentConsumable.consumables.map(consumable => {
                return {
                    quantity: consumable.quantity,
                    consumable: consumable.presenter(),
                }
            })
        }
    }
}