import RepositoryFactory from "@application/repository/RepositoryFactory";
import treatmentConsumableSchema, { TreatmentConsumableSchemaType } from "../schema/treatmentConsumableSchema";
import { Repository } from "typeorm";
import ITreatmentConsumableRepository from "@modules/treatment/domain/repository/ITreatmentConsumableRepository";


@RepositoryFactory.register(treatmentConsumableSchema)
class TreatmentConsumableRepository implements ITreatmentConsumableRepository {
    constructor(private readonly _ormRepository: Repository<TreatmentConsumableSchemaType>) { }

    public async save(treatmentConsumable: TreatmentConsumableSchemaType[]): Promise<void> {
        await this._ormRepository.insert(treatmentConsumable);
    }
}

export default TreatmentConsumableRepository;