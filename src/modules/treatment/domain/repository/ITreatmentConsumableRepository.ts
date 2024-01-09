import { IRepository } from "@application/repository/IRepository";
import { TreatmentConsumableSchemaType } from "@modules/treatment/infrastructure/schema/treatmentConsumableSchema";

export default interface ITreatmentConsumableRepository extends IRepository {
    save(treatmentConsumable: TreatmentConsumableSchemaType[]): Promise<void>;
}