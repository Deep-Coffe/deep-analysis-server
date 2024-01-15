import Entity from "@application/entity/Entity";
import IConsumable from "./IConsumable";
import { DateMetadata } from "@application/entity/DateMetadata";

class Consumable extends Entity<IConsumable> {
    public quantity?: number;

    private constructor(props: IConsumable, id?: string, date?: DateMetadata) {
        super(props, id, date);
    }

    public addQuantity(quantity: number) {
        this.quantity = quantity;
    }

    static createConsumable(props: IConsumable, id?: string, date?: DateMetadata) {
        return new Consumable(props, id, date);
    }
}

export default Consumable;