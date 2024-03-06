import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import DeleteAnalysisService from "@modules/analysis/domain/service/deleteAnalysisService/DeleteAnalysisService";
import { injectable } from "tsyringe";

@injectable()
class DeleteAnalysisController implements IController {
    constructor(private readonly _deleteAnalysisService: DeleteAnalysisService) { }

    public async handle({ payload }: ControllerInput<{ id: string }>) {
        await this._deleteAnalysisService.execute({ analysisId: payload.id });

        return {
            deleted: true,
        }
    }
}

export default DeleteAnalysisController;