import IPlagueRepository from "@modules/plague/domain/repository/IPlagueRepository";
import { Repository } from "typeorm";
import plagueSchema, { PlagueSchemaType } from "../schema/PlagueSchema";
import Plague from "@modules/plague/domain/entity/Plague";
import PlagueMapper from "@modules/plague/common/PlagueMapper";
import RepositoryFactory from "@application/repository/RepositoryFactory";
import PlagueRepositoryMapper from "./PlagueRepositoryMapper";
import { ListPlagueServiceOutput } from "@modules/plague/domain/service/ListPlagueService/ListPlagueServiceDTO";


@RepositoryFactory.register(plagueSchema)
class PlagueRepository implements IPlagueRepository {
    constructor(private readonly _ormRepository: Repository<PlagueSchemaType>) { }

    public async findByName(name: string): Promise<Plague | undefined> {
        const plague = await this._ormRepository.findOne({
            where: {
                name
            }
        });

        return PlagueMapper.toDomain(plague);
    }

    public async findById(id: string): Promise<Plague | undefined> {
        const plague = await this._ormRepository.findOne({
            where: {
                id
            }
        });

        return PlagueMapper.toDomain(plague);
    }

    public async findAll(): Promise<ListPlagueServiceOutput[]> {
        const plagues = await this._ormRepository.find();

        return PlagueRepositoryMapper.findAllToDomain(plagues);
    }

    public async save(plague: PlagueSchemaType): Promise<void> {
        await this._ormRepository.insert(plague);
    }
}

export default PlagueRepository;