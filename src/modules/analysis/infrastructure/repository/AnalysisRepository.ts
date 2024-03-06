import RepositoryFactory from "@application/repository/RepositoryFactory";
import IAnalysisRepository from "@modules/analysis/domain/repository/IAnalysisRepository";
import analysisSchema, { AnalysisSchemaType } from "../schema/AnalysisSchema";
import { Repository } from "typeorm";
import AnalysisRepositoryMapper from "./AnalysisRepositoryMapper";
import { ListAnalysisOutputDTO } from "./AnalysisRepositoryDTO";
import Analysis from "@modules/analysis/domain/entity/Analysis";
import AnalysisMapper from "@modules/analysis/common/AnalysisMapper";

@RepositoryFactory.register(analysisSchema)
class AnalysisRepository implements IAnalysisRepository {
    constructor(private readonly _ormRepository: Repository<AnalysisSchemaType>) { }

    public async save(analysis: AnalysisSchemaType): Promise<void> {
        await this._ormRepository.insert(analysis);
    }

    public async findById(id: string): Promise<Analysis | undefined> {
        const data = await this._ormRepository.findOne({
            where: {
                id,
            }
        });

        return AnalysisMapper.toDomain(data);
    }

    public async delete(id: string): Promise<void> {
        await this._ormRepository.delete(id);
    }

    public async findAll(): Promise<ListAnalysisOutputDTO[]> {
        const data = await this._ormRepository.createQueryBuilder('analysis')
            .select([
                'analysis.id as id',
                'analysis.author as author',
                'analysis.name as name',
                'analysis.phoma as phoma',
                'analysis.cerscospora as cerscospora',
                'analysis.leafRust as leafRust',
                'analysis.miner as miner',
                'analysis.healthy as healthy',
                'analysis.analyzedAt as analyzedAt',
                'attachment.fileName as filename',
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
            .leftJoin('attachment', 'attachment', 'analysis."attachmentId" = attachment.id')
            .leftJoin('treatment', 'treatment', 'plague.id = treatment.plagueId')
            .leftJoin('treatment_consumable', 'treatment_consumable', 'treatment_consumable.treatmentId = treatment.id')
            .leftJoin('consumable', 'consumable', 'consumable.id = treatment_consumable.consumableId')
            .getRawMany();

        return AnalysisRepositoryMapper.list(data);
    }
}

export default AnalysisRepository