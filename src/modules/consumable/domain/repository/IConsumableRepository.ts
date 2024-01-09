import Consumable from "@modules/consumable/domain/entity/Consumable";
import { ConsumableSchemaType } from "../../infrastructure/schema/ConsumableSchema";
import { IRepository } from "@application/repository/IRepository";

export default interface IConsumableRepository extends IRepository {
    findByName(name: string): Promise<Consumable | undefined>;
    findById(id: string): Promise<Consumable | undefined>;
    save(consumable: ConsumableSchemaType): Promise<void>;
    findAll(searchTerm?: string, limit?: number, offset?: number): Promise<ConsumableSchemaType[]>;
}