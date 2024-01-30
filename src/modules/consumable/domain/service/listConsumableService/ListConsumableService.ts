import IConsumableRepository from "@modules/consumable/domain/repository/IConsumableRepository";
import { inject, injectable } from "tsyringe";
import { ListConsumableServiceInputDTO } from "./ListConsumableServiceDTO";

@injectable()
class ListConsumableService {
    constructor(@inject('ConsumableRepository') private readonly _consumableRepository: IConsumableRepository) { }

    public async execute({ searchTerm, limit, offset }: ListConsumableServiceInputDTO) {
        return this._consumableRepository.findAll(searchTerm, limit, offset);
    }
}

export default ListConsumableService;