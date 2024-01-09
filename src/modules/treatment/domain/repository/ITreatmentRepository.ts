import { IRepository } from "@application/repository/IRepository";
import { TreatmentSchemaType } from "@modules/treatment/infrastructure/schema/treatmentSchema";

export default interface ITreatmentRepository extends IRepository {
    save(treatment: TreatmentSchemaType): Promise<void>;
}