import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import AuthProvider from "@common/providers/AuthProvider";
import IUser from "@modules/user/domain/entity/IUser";
import CreateUserService from "@modules/user/domain/service/createUserService/CreateUserService";
import { injectable } from "tsyringe";

@injectable()
class CreateUserController implements IController {
    constructor(private readonly _createUserService: CreateUserService,
        private readonly _authProvider: AuthProvider) { }

    public async handle({ payload }: ControllerInput<IUser>) {
        const user = await this._createUserService.execute(payload);

        const token = this._authProvider.sing(user);

        return {
            name: user.props.name,
            id: user.id.toString(),
            token,
        }
    }
}

export default CreateUserController;