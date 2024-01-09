import Repositories from "@common/enum/Repositories";
import IConsumableRepository from "@modules/consumable/domain/repository/IConsumableRepository";
import { inject, injectable } from "tsyringe";
import { FindOrCreateConsumableServiceInputDTO } from "./FindOrCreateConsumableServiceDTO";
import NotFoundError from "@application/error/NotFoundError";
import Consumable from "../../entity/Consumable";
import ConsumableMapper from "@modules/consumable/common/ConsumableMapper";

@injectable()
class FindOrCreateConsumableService {
    constructor(@inject(Repositories.ConsumableRepository) private readonly _consumableRepository: IConsumableRepository) { }

    public async execute(data: FindOrCreateConsumableServiceInputDTO) {
        if ('id' in data) {
            const consumable = await this._consumableRepository.findById(data.id);

            if (!consumable) throw new NotFoundError('Consumable not found');

            return consumable;
        }

        const consumable = await this._consumableRepository.findByName(data.name);

        if (consumable) return consumable;

        const newConsumable = Consumable.createConsumable(data);

        await this._consumableRepository.save(ConsumableMapper.toPersist(newConsumable));

        return newConsumable;

    }
}

export default FindOrCreateConsumableService;