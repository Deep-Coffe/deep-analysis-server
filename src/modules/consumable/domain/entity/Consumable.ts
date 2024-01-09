import Entity from "@application/entity/Entity";
import IConsumable from "./IConsumable";

class Consumable extends Entity<IConsumable> {
    public quantity?: number;

    private constructor(props: IConsumable, id?: string) {
        super(props, id);
    }

    public addQuantity(quantity: number) {
        this.quantity = quantity;
    }

    static createConsumable(props: IConsumable, id?: string) {
        return new Consumable(props, id);
    }
}

export default Consumable;