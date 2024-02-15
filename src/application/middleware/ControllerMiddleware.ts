import Logger from "@application/config/LoggerConfig";
import { ControllerInput } from "@application/controller/ControllerIO";
import IController from "@application/controller/IController";
import AppDataSource from "@application/database/AppDataSource";
import Injection from "@application/helpers/Injection";
import { Types } from "@application/types/Types";

class ControllerMiddleware {
    constructor() { }

    public async handle(target: Types<IController>, injection: Injection, payload: ControllerInput<Record<string, unknown>> | Omit<ControllerInput, 'user'>) {
        const queryRunner = AppDataSource.getQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const controller = injection.resolver(target, queryRunner);

        try {
            Logger.info(`Run Controller: ${target.name}`);
            const response = await controller.handle(payload);

            await queryRunner.commitTransaction();

            return response;
        } catch (error) {
            Logger.info('Rollback transaction')
            await queryRunner.rollbackTransaction();

            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}

export default ControllerMiddleware;