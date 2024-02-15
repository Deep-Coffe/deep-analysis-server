import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import CreateSessionService from "@modules/user/domain/service/createSessionService/CreateSessionService";
import { CreateSessionServiceInputDTO } from "@modules/user/domain/service/createSessionService/CreateSessionServiceDTO";

import { injectable } from "tsyringe";

@injectable()
class CreateSessionController implements IController {
    constructor(private readonly _createSessionService: CreateSessionService) { }

    public async handle({ payload }: ControllerInput<CreateSessionServiceInputDTO>) {
        return await this._createSessionService.execute(payload);
    }
}

export default CreateSessionController;