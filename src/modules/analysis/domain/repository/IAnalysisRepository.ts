import { IRepository } from "@application/repository/IRepository";
import { PlagueEnum } from "@common/enum/Plague";
import { ListAnalysisOutputDTO } from "@modules/analysis/infrastructure/repository/AnalysisRepositoryDTO";
import { AnalysisSchemaType } from "@modules/analysis/infrastructure/schema/AnalysisSchema";

export default interface IAnalysisRepository extends IRepository {
    save(analysis: AnalysisSchemaType): Promise<void>;
    findPlagueIdByName(name: PlagueEnum): Promise<string | undefined>;
    findAllByUserId(userId: string): Promise<ListAnalysisOutputDTO[]>;
}