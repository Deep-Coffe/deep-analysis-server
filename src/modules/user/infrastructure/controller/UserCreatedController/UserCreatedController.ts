import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import CreateUserService from "@modules/user/domain/service/createUserService.ts/CreateUserService";
import { injectable } from "tsyringe";
import { UserCreatedControllerInputDTO } from "./UserCreatedControllerDTO";

@injectable()
class UserCreatedController implements IController {
    constructor(private readonly _createUserService: CreateUserService) { }

    public async handle(data: ControllerInput<UserCreatedControllerInputDTO>) {
        await this._createUserService.execute({ userId: data.payload.id });
    }
}

export default UserCreatedController;