import { inject, injectable } from "tsyringe";
import IAnalysisRepository from "../../repository/IAnalysisRepository";
import AnalysisRepository from "@modules/analysis/infrastructure/repository/AnalysisRepository";

@injectable()
class ListAnalysisService {
    constructor(@inject(AnalysisRepository) private readonly _analysisRepository: IAnalysisRepository) { }

    public async execute(userId: string) {
        return this._analysisRepository.findAllByUserId(userId);
    }
}

export default ListAnalysisService;