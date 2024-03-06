import { IRepository } from "@application/repository/IRepository";
import { AnalysisSchemaType } from "@modules/analysis/infrastructure/schema/AnalysisSchema";
import Analysis from "../entity/Analysis";
import { ListAnalysisOutputDTO } from "@modules/analysis/infrastructure/repository/AnalysisRepositoryDTO";

export default interface IAnalysisRepository extends IRepository {
    save(analysis: AnalysisSchemaType): Promise<void>;
    findAll(): Promise<ListAnalysisOutputDTO[]>;
    findById(id: string): Promise<Analysis | undefined>;
    delete(id: string): Promise<void>;
}