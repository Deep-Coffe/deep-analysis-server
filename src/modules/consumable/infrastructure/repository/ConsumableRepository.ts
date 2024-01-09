import RepositoryFactory from "@application/repository/RepositoryFactory";
import Repositories from "@common/enum/Repositories";
import consumableSchema, { ConsumableSchemaType } from "../schema/ConsumableSchema";
import IConsumableRepository from "../../domain/repository/IConsumableRepository";
import { ILike, Repository } from "typeorm";
import Consumable from "@modules/consumable/domain/entity/Consumable";
import ConsumableMapper from "@modules/consumable/common/ConsumableMapper";

@RepositoryFactory.register(Repositories.ConsumableRepository, consumableSchema)
class ConsumableRepository implements IConsumableRepository {
    constructor(private _ormRepository: Repository<ConsumableSchemaType>) { }

    public async findAll(searchTerm?: string, limit = 100, offset = 0): Promise<ConsumableSchemaType[]> {
        return await this._ormRepository.find({
            ...(searchTerm && {
                where: {
                    name: ILike(`%${searchTerm}%`)
                }
            }),
            skip: offset,
            take: limit,
        });
    }

    public async save(consumable: ConsumableSchemaType): Promise<void> {
        await this._ormRepository.insert(consumable);
    }

    public async findById(id: string): Promise<Consumable | undefined> {
        const consumable = await this._ormRepository.findOne({
            where: {
                id
            }
        });

        return ConsumableMapper.toDomain(consumable);
    }

    public async findByName(name: string): Promise<Consumable | undefined> {
        const consumable = await this._ormRepository.findOne({
            where: {
                name
            }
        });

        return ConsumableMapper.toDomain(consumable);
    }
}

export default ConsumableRepository;