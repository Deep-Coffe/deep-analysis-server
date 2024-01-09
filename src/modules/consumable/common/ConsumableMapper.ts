import Consumable from "../domain/entity/Consumable";
import { ConsumableSchemaType } from "../infrastructure/schema/ConsumableSchema";

export default class ConsumableMapper {
    static toDomain(raw: ConsumableSchemaType | null): Consumable | undefined {
        if (!raw) return;

        return Consumable.createConsumable({
            name: raw.name as string,
        }, raw.id as string);
    }

    static toPersist(consumable: Consumable): ConsumableSchemaType {
        return {
            id: consumable.id.toString(),
            name: consumable.props.name,
        }
    }
}