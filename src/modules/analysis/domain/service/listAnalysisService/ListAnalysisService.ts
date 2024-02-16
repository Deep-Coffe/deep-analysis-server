import { inject, injectable } from "tsyringe";
import IAnalysisRepository from "../../repository/IAnalysisRepository";

@injectable()
class ListAnalysisService {
    constructor(@inject('AnalysisRepository') private readonly _analysisRepository: IAnalysisRepository) { }

    public async execute(userId: string) {
        return this._analysisRepository.findAllByUserId(userId);
    }
}

export default ListAnalysisService;