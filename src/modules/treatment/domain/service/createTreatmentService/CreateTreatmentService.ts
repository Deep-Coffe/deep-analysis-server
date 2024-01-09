import { inject, injectable } from "tsyringe";
import TreatmentConsumable from "../../entity/TreatmentConsumable";
import { CreateTreatmentServiceInputDTO } from "./CreateTreatmentServiceDTO";
import Repositories from "@common/enum/Repositories";
import ITreatmentRepository from "../../repository/ITreatmentRepository";
import IAnalysisRepository from "@modules/analysis/domain/repository/IAnalysisRepository";
import NotFoundError from "@application/error/NotFoundError";
import TreatmentMapper from "@modules/treatment/common/TreatmentMapper";
import ITreatmentConsumableRepository from "../../repository/ITreatmentConsumableRepository";

@injectable()
class CreateTreatmentService {
    constructor(@inject(Repositories.TreatmentRepository) private readonly _treatmentRepository: ITreatmentRepository,
        @inject(Repositories.TreatmentConsumableRepository) private readonly _treatmentConsumableRepository: ITreatmentConsumableRepository,
        @inject(Repositories.AnalysisRepository) private readonly _analysisRepository: IAnalysisRepository,
    ) { }

    public async execute(data: CreateTreatmentServiceInputDTO) {
        const { consumables, ...others } = data;
        const { plagueName, ...treatment } = others;

        const plagueId = await this._analysisRepository.findPlagueIdByName(plagueName);

        if (!plagueId) throw new NotFoundError('Plague not found');

        const treatmentConsumable = TreatmentConsumable.createTreatment({
            ...treatment,
            plagueId,
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