import Repositories from "@common/enum/Repositories";
import { inject, injectable } from "tsyringe";
import IAnalysisRepository from "../../repository/IAnalysisRepository";

@injectable()
class ListAnalysisService {
    constructor(@inject(Repositories.AnalysisRepository) private readonly _analysisRepository: IAnalysisRepository) { }

    public async execute(userId: string) {
        return this._analysisRepository.findAllByUserId(userId);
    }
}

export default ListAnalysisService;