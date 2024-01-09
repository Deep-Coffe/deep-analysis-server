import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import ListConsumableService from "@modules/consumable/domain/service/listConsumableService/ListConsumableService";
import { ListConsumableServiceInputDTO } from "@modules/consumable/domain/service/listConsumableService/ListConsumableServiceDTO";
import { injectable } from "tsyringe";

@injectable()
class ListConsumableController implements IController {
    constructor(private readonly _listConsumableService: ListConsumableService) { }

    public async handle({ payload }: ControllerInput<ListConsumableServiceInputDTO>) {
        return await this._listConsumableService.execute(payload);
    }
}

export default ListConsumableController;