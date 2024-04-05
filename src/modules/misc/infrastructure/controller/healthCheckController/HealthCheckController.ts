/* eslint-disable @typescript-eslint/no-unused-vars */
import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";

class HealthCheckController implements IController {
    public async handle(_: ControllerInput) {
        await Promise.resolve();

        return {
            health: true,
        }
    }
}

export default HealthCheckController