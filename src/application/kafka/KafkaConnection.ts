import Logger from "@application/config/LoggerConfig";
import topics from "@common/topics/Topics";
import { Kafka } from "kafkajs";

class KafkaConnection {
    static kafka = new Kafka({
        clientId: 'analysis-server',
        brokers: ['localhost:9092', 'localhost:9092']
    });

    static consumer = KafkaConnection.kafka.consumer({ groupId: 'kafka' });

    static async getConsumer() {
        await KafkaConnection.consumer.connect();
        await KafkaConnection.consumer.subscribe({ topics })
        return KafkaConnection.consumer;
    }

    static async connect() {
        Logger.info('Kafka configured')
    }
}

export default KafkaConnection;