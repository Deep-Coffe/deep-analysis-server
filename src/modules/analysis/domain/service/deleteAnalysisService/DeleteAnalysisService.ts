import { inject, injectable } from "tsyringe";
import IAnalysisRepository from "../../repository/IAnalysisRepository";
import NotFoundError from "@application/error/NotFoundError";

@injectable()
class DeleteAnalysisService {
    constructor(@inject('AnalysisRepository') private readonly _analysisRepository: IAnalysisRepository) { }

    public async execute({ analysisId }: { analysisId: string }): Promise<void> {
        const analysis = await this._analysisRepository.findById(analysisId);

        if (!analysis) throw new NotFoundError('Analise não encontrada');

        await this._analysisRepository.delete(analysis.id.toString());
    }
}

export default DeleteAnalysisService;