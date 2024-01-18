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

        /* 
                This not will producer message yet
                const producer = await KafkaConnection.getProducer();
                const messageSubject = new MessageSubject(producer); 
                */
        const controller = injection.resolver(target, queryRunner,);

        try {
            Logger.info(`Run Controller: ${target.name}`);
            const response = await controller.handle(payload);

            await queryRunner.commitTransaction();
            /*
            This not will producer message yet 
            await messageSubject.notify(); 
            */
            return response;
        } catch (error) {
            Logger.info('Rollback transaction')
            await queryRunner.rollbackTransaction();

            throw error;
        } finally {
            await queryRunner.release();
            /*          
                        This not will producer message yet
                        await producer.disconnect() */
        }
    }
}

export default ControllerMiddleware;