import IController from "@application/controller/IController"
import Injection from "@application/helpers/Injection";
import ControllerMiddleware from "@application/middleware/ControllerMiddleware";
import { Types } from "@application/types/Types";
import { MessageDataObserverType } from "@common/observers/observer/MessageDataObserverType";
import KafkaConnection from "./KafkaConnection";
import Logger from "@application/config/LoggerConfig";

export type Subscribers = {
    controller: Types<IController>;
    handleAction: string;
}

export abstract class SubscriberDomain {
    abstract subscriberConfigs: Subscribers[];

    public async setup(injection: Injection) {
        const controllerMiddleware = new ControllerMiddleware();
        const consumer = await KafkaConnection.getConsumer();
        await consumer.run({
            eachMessage: async ({ message }) => {
                try {
                    const buf = Buffer.from(message.value as Buffer);
                    const base64Data = buf.toString();
                    const { action, ...data } = JSON.parse(base64Data) as unknown as MessageDataObserverType;

                    const subscriber = this.subscriberConfigs.find(subscriber => subscriber.handleAction === action);
                    if (subscriber) {
                        Logger.info(`Handle a message and run controller: ${subscriber?.controller.name}`);
                        await controllerMiddleware.handle(subscriber.controller, injection, { payload: data });
                    }
                } catch (err) {
                    Logger.error(err as Error);
                }
            }
        });
    }
}