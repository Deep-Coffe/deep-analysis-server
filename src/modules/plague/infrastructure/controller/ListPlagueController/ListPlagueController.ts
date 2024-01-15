/* eslint-disable @typescript-eslint/no-unused-vars */
import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import ListPlagueService from "@modules/plague/domain/service/ListPlagueService/ListPlagueService";
import { injectable } from "tsyringe";

@injectable()
class ListPlagueController implements IController {
    constructor(private readonly _listPlagueService: ListPlagueService) { }

    public handle(_: ControllerInput<void>) {
        return this._listPlagueService.execute();
    }
}

export default ListPlagueController;