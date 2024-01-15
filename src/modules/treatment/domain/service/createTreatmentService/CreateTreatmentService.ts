import { inject, injectable } from "tsyringe";
import TreatmentConsumable from "../../entity/TreatmentConsumable";
import { CreateTreatmentServiceInputDTO } from "./CreateTreatmentServiceDTO";
import ITreatmentRepository from "../../repository/ITreatmentRepository";
import TreatmentMapper from "@modules/treatment/common/TreatmentMapper";
import ITreatmentConsumableRepository from "../../repository/ITreatmentConsumableRepository";
import TreatmentRepository from "@modules/treatment/infrastructure/repository/TreatmentRepository";
import TreatmentConsumableRepository from "@modules/treatment/infrastructure/repository/TreatmentConsumableRepository";
import PlagueRepository from "@modules/plague/infrastructure/repository/PlagueRepository";
import IPlagueRepository from "@modules/plague/domain/repository/IPlagueRepository";
import NotFoundError from "@application/error/NotFoundError";

@injectable()
class CreateTreatmentService {
    constructor(@inject(TreatmentRepository) private readonly _treatmentRepository: ITreatmentRepository,
        @inject(TreatmentConsumableRepository) private readonly _treatmentConsumableRepository: ITreatmentConsumableRepository,
        @inject(PlagueRepository) private readonly _plagueRepository: IPlagueRepository,
    ) { }

    public async execute(data: CreateTreatmentServiceInputDTO) {
        const { consumables, ...treatment } = data;

        const plague = await this._plagueRepository.findById(treatment.plagueId);

        if (!plague) throw new NotFoundError('Plague not found!');

        const treatmentConsumable = TreatmentConsumable.createTreatment({
            ...treatment
        });

        consumables.forEach((data) => {
            treatmentConsumable.addConsumable(data.consumable, data.quantity);
        });

        await this._treatmentRepository.save(TreatmentMapper.toPersist(treatmentConsumable.treatment));
        await this._treatmentConsumableRepository.save(TreatmentMapper.treatmentConsumableToPersist(treatmentConsumable));

        return treatmentConsumable;
    }
}

export default CreateTreatmentService;