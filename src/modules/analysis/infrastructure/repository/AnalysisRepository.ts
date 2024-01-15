import RepositoryFactory from "@application/repository/RepositoryFactory";
import IAnalysisRepository from "@modules/analysis/domain/repository/IAnalysisRepository";
import analysisSchema, { AnalysisSchemaType } from "../schema/AnalysisSchema";
import { Repository } from "typeorm";
import AnalysisRepositoryMapper from "./AnalysisRepositoryMapper";
import { ListAnalysisOutputDTO } from "./AnalysisRepositoryDTO";

@RepositoryFactory.register(analysisSchema)
class AnalysisRepository implements IAnalysisRepository {
    constructor(private readonly _ormRepository: Repository<AnalysisSchemaType>) { }

    public async save(analysis: AnalysisSchemaType): Promise<void> {
        await this._ormRepository.insert(analysis);
    }

    public async findAllByUserId(userId: string): Promise<ListAnalysisOutputDTO[]> {
        const data = await this._ormRepository.createQueryBuilder('analysis')
            .select([
                'analysis.id as id',
                'analysis.userId as userId',
                'analysis.author as author',
                'analysis.phoma as phoma',
                'analysis.cerscospora as cerscospora',
                'analysis.leafRust as leafRust',
                'analysis.miner as miner',
                'analysis.healthy as healthy',
                'analysis.analyzedAt as analyzedAt',
                'plague.id',
                'plague.name',
                'treatment.id',
                'treatment.name',
                'treatment_consumable.quantity',
                'consumable.id',
                'consumable.name',
                'analysis.analyzedAt as analyzedAt',
                'analysis.createdAt as createdAt',
            ])
            .leftJoin('plague', 'plague', 'analysis.plagueId = plague.id')
            .leftJoin('treatment', 'treatment', 'plague.id = treatment.plagueId')
            .leftJoin('treatment_consumable', 'treatment_consumable', 'treatment_consumable.treatmentId = treatment.id')
            .leftJoin('consumable', 'consumable', 'consumable.id = treatment_consumable.consumableId')
            .where('analysis.userId = :userId', { userId })
            .getRawMany();

        return AnalysisRepositoryMapper.list(data);
    }
}

export default AnalysisRepository