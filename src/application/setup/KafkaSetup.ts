import ISetup from "./ISetup";
import KafkaConnection from "@application/kafka/KafkaConnection";
import path from 'path'
import fs from 'fs'
import { SubscriberDomain } from "@application/kafka/ConsumerDomain";
import Injection from "@application/helpers/Injection";
import Logger from "@application/config/LoggerConfig";

class KafkaSetup implements ISetup {

    public async setupSubscribers() {
        Logger.info('Try setup subscribers');
        const injection = new Injection();
        const subscribers: SubscriberDomain[] = []
        const modulesDir = path.join(__dirname, '..', '..', 'modules');

        const moduleFolders = fs.readdirSync(modulesDir).filter(item =>
            fs.statSync(path.join(modulesDir, item)).isDirectory()
        );

        moduleFolders.forEach(moduleFolder => {
            const routesDir = path.join(modulesDir, moduleFolder, 'infrastructure', 'subscriber');

            if (fs.existsSync(routesDir)) {
                const routeFiles = fs.readdirSync(routesDir);

                const subscriberModules = routeFiles
                    .filter(file => file.endsWith('.ts'))
                    .map(file => require(path.join(routesDir, file)));

                subscriberModules.forEach(subscriberModule => {
                    if (subscriberModule.default.prototype instanceof SubscriberDomain) {
                        const subscribe = new subscriberModule.default() as SubscriberDomain;
                        subscribers.push(subscribe);
                    }
                });
            }
        });

        for (const subscribe of subscribers) {
            await subscribe.setup(injection);
        }
        Logger.info('Subscriber setup run with success');
    }

    public async run() {
        Logger.info('Try connect with kafka');
        try {
            await KafkaConnection.connect();
            await this.setupSubscribers();
            Logger.info('kafka connect with Success');
        } catch (err) {
            Logger.warn('Connect with kafka failed!');
            Logger.error(err as Error);
        }
    }
}

export default KafkaSetup;