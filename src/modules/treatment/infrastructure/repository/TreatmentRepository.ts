import ITreatmentRepository from "@modules/treatment/domain/repository/ITreatmentRepository";
import { Repository } from "typeorm";
import treatmentSchema, { TreatmentSchemaType } from "../schema/treatmentSchema";
import RepositoryFactory from "@application/repository/RepositoryFactory";

@RepositoryFactory.register(treatmentSchema)
class TreatmentRepository implements ITreatmentRepository {
    constructor(private readonly _ormRepository: Repository<TreatmentSchemaType>) { }

    public async save(treatment: TreatmentSchemaType): Promise<void> {
        await this._ormRepository.insert(treatment);
    }
}

export default TreatmentRepository;