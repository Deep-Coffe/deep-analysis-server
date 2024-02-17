import { IRepository } from "@application/repository/IRepository";
import { ListAnalysisOutputDTO } from "@modules/analysis/infrastructure/repository/AnalysisRepositoryDTO";
import { AnalysisSchemaType } from "@modules/analysis/infrastructure/schema/AnalysisSchema";
import Analysis from "../entity/Analysis";

export default interface IAnalysisRepository extends IRepository {
    save(analysis: AnalysisSchemaType): Promise<void>;
    findAllByUserId(userId: string): Promise<ListAnalysisOutputDTO[]>;
    findById(id: string): Promise<Analysis | undefined>;
    delete(id: string): Promise<void>;
}