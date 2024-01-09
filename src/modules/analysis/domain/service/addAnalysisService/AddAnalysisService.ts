import { inject, injectable } from "tsyringe";
import Analysis from "../../entity/Analysis";
import { AddAnalysisServiceInputDTO } from "./AddAnalysisServiceDTO";
import Repositories from "@common/enum/Repositories";
import IAnalysisRepository from "../../repository/IAnalysisRepository";
import BadRequestError from "@application/error/BadRequestError";
import AnalysisMapper from "@modules/analysis/common/AnalysisMapper";

@injectable()
class AddAnalysisService {
    constructor(@inject(Repositories.AnalysisRepository) private readonly _analysisRepository: IAnalysisRepository) { }

    public async execute(data: AddAnalysisServiceInputDTO) {
        console.log(data.analyzedAt);

        const analysis = Analysis.createAnalysis({
            analyzedAt: data.analyzedAt ?? new Date(),
            ...data,
        });

        const analysisResult = analysis.analyser();

        if (analysisResult.plague) {
            const plagueId = await this._analysisRepository.findPlagueIdByName(analysisResult.plague.name);

            if (!plagueId) throw new BadRequestError('Plague id not found!');

            analysis.setPlagueId(plagueId);
        }

        await this._analysisRepository.save(AnalysisMapper.toPersist(analysis));

        return analysis.presenter()
    }
}

export default AddAnalysisService;