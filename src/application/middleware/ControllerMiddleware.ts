import Logger from "@application/config/LoggerConfig";
import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import Injection from "@application/helpers/Injection";
import { Types } from "@application/types/Types";

class ControllerMiddleware {
    constructor() { }

    public async handle(target: Types<IController>, injection: Injection, payload: ControllerInput<Record<string, unknown>> | Omit<ControllerInput, 'user'>) {
        const controller = injection.resolver(target);

        Logger.info(`Run Controller: ${target.name}`);
        const response = await controller.handle(payload);

        return response;

    }
}

export default ControllerMiddleware;