import { inject, injectable } from "tsyringe";
import Analysis from "../../entity/Analysis";
import { AddAnalysisServiceInputDTO } from "./AddAnalysisServiceDTO";
import IAnalysisRepository from "../../repository/IAnalysisRepository";
import BadRequestError from "@application/error/BadRequestError";
import AnalysisMapper from "@modules/analysis/common/AnalysisMapper";
import IPlagueRepository from "@modules/plague/domain/repository/IPlagueRepository";

@injectable()
class AddAnalysisService {
    constructor(@inject('AnalysisRepository') private readonly _analysisRepository: IAnalysisRepository,
        @inject('PlagueRepository') private readonly _plagueRepository: IPlagueRepository) { }

    public async execute(data: AddAnalysisServiceInputDTO) {
        const analysis = Analysis.createAnalysis({
            analyzedAt: data.analyzedAt ?? new Date(),
            ...data,
        });

        const analysisResult = analysis.analyser();

        if (analysisResult.plague) {
            const plague = await this._plagueRepository.findByName(analysisResult.plague.props.name);

            if (!plague) throw new BadRequestError('Plague id not found!');

            const analysisPlague = analysis.getPlague();
            analysisPlague?.setId(plague.id);
        }

        await this._analysisRepository.save(AnalysisMapper.toPersist(analysis));

        return analysis.presenter()
    }
}

export default AddAnalysisService;