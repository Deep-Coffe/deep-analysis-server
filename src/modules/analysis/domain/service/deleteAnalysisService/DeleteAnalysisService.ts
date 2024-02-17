import { inject, injectable } from "tsyringe";
import IAnalysisRepository from "../../repository/IAnalysisRepository";
import NotFoundError from "@application/error/NotFoundError";
import BadRequestError from "@application/error/BadRequestError";

@injectable()
class DeleteAnalysisService {
    constructor(@inject('AnalysisRepository') private readonly _analysisRepository: IAnalysisRepository) { }

    public async execute({ userId, analysisId }: { userId: string, analysisId: string }): Promise<void> {
        const analysis = await this._analysisRepository.findById(analysisId);

        if (!analysis) throw new NotFoundError('Analise não encontrada');

        if (!analysis.validateUserOwnership(userId)) throw new BadRequestError('Ação não permitida');

        await this._analysisRepository.delete(analysis.id.toString());
    }
}

export default DeleteAnalysisService;