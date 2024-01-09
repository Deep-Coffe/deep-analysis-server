import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import { injectable } from "tsyringe";
import { AddAnalysisControllerInputDTO } from "./AddAnalysisControllerDTO";
import AddAnalysisService from "@modules/analysis/domain/service/addAnalysisService/AddAnalysisService";

@injectable()
class AddAnalysisController implements IController {
    constructor(private readonly _addAnalysisService: AddAnalysisService) { }

    public async handle({ payload, user }: ControllerInput<AddAnalysisControllerInputDTO>) {
        const result = await this._addAnalysisService.execute({
            userId: user.id,
            ...payload
        });

        return result;
    }
}

export default AddAnalysisController;