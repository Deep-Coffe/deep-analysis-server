import RepositoryFactory from "@application/repository/RepositoryFactory";
import Repositories from "@common/enum/Repositories";
import IAnalysisRepository from "@modules/analysis/domain/repository/IAnalysisRepository";
import analysisSchema, { AnalysisSchemaType } from "../schema/AnalysisSchema";
import { Repository } from "typeorm";
import plagueSchema from "@modules/valueObject/plague/schema/PlagueSchema";
import { PlagueEnum } from "@common/enum/Plague";
import AnalysisRepositoryMapper from "./AnalysisRepositoryMapper";
import { ListAnalysisOutputDTO } from "./AnalysisRepositoryDTO";

@RepositoryFactory.register(Repositories.AnalysisRepository, analysisSchema)
class AnalysisRepository implements IAnalysisRepository {
    constructor(private readonly _ormRepository: Repository<AnalysisSchemaType>) { }

    public async save(analysis: AnalysisSchemaType): Promise<void> {
        await this._ormRepository.insert(analysis);
    }

    public async findAllByUserId(userId: string): Promise<ListAnalysisOutputDTO[]> {
        const data = await this._ormRepository.createQueryBuilder('analysis')
            .select([
                'analysis.id as id',
                'analysis.author as author',
                'analysis.phoma as phoma',
                'analysis.cerscospora as cerscospora',
                'analysis.leafRust as leafRust',
                'analysis.miner as miner',
                'analysis.healthy as healthy',
                'plague.name',
                'analysis.analyzedAt as analyzedAt',
                'analysis.createdAt as createdAt',
            ])
            .leftJoin('plague', 'plague', 'analysis.plagueId = plague.id')
            .where('analysis.userId = :userId', { userId })
            .getRawMany()

        return AnalysisRepositoryMapper.list(data);
    }

    public async findPlagueIdByName(name: PlagueEnum): Promise<string | undefined> {
        const data = await this._ormRepository.manager.findOne(plagueSchema, {
            where: {
                name
            }
        })

        return data?.id
    }
}

export default AnalysisRepository