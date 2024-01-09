import Consumable from "@modules/consumable/domain/entity/Consumable";
import Treatment from "./Treatment";
import ITreatment from "./ITreatment";

class TreatmentConsumable {
    public readonly consumables: Consumable[] = [];
    public readonly treatment: Treatment;

    private constructor(treatment: Treatment) {
        this.treatment = treatment;
    }

    public addConsumable(consumable: Consumable, quantity: number) {
        consumable.addQuantity(quantity);
        this.consumables.push(consumable);
    }

    static createTreatment(treatmentProps: ITreatment) {
        return new TreatmentConsumable(Treatment.createTreatment(treatmentProps));
    }
}

export default TreatmentConsumable;