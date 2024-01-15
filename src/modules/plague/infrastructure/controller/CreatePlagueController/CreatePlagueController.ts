import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import { injectable } from "tsyringe";
import { CreatePlagueControllerInputDTO } from "./CreatePlagueControllerDTO";
import CreatePlagueService from "@modules/plague/domain/service/createPlagueService/CreatePlagueService";

@injectable()
class CreatePlagueController implements IController {
    constructor(private readonly _createPlagueService: CreatePlagueService) { }

    public async handle(data: ControllerInput<CreatePlagueControllerInputDTO>) {
        const plague = await this._createPlagueService.execute(data.payload);

        return plague.presenter();
    }
}

export default CreatePlagueController;