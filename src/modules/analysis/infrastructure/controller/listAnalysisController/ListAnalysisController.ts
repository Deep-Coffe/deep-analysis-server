/* eslint-disable @typescript-eslint/no-unused-vars */
import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import ListAnalysisService from "@modules/analysis/domain/service/listAnalysisService/ListAnalysisService";
import { injectable } from "tsyringe";

@injectable()
class ListAnalysisController implements IController {
    constructor(private readonly _listAnalysisService: ListAnalysisService) { }

    public async handle(_: ControllerInput<void>) {
        return await this._listAnalysisService.execute();
    }
}

export default ListAnalysisController;