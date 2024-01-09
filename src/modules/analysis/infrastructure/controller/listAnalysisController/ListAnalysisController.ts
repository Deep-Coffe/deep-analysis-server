import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import ListAnalysisService from "@modules/analysis/domain/service/listAnalysisService/ListAnalysisService";
import { injectable } from "tsyringe";

@injectable()
class ListAnalysisController implements IController {
    constructor(private readonly _listAnalysisService: ListAnalysisService) { }

    public async handle({ user }: ControllerInput<void>) {
        return await this._listAnalysisService.execute(user.id);
    }
}

export default ListAnalysisController;