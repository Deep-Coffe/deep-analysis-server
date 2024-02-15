import EnvHelper from '@application/helpers/EnvHelper';
import dotenv from 'dotenv';
import path from 'path'

dotenv.config();

export const serverConfig = {
    client: process.env.CLIENT ?? '*',
    use_kafka: EnvHelper.getBoolean(process.env.USE_KAFKA ?? 'false'),
    access_nexus_server: process.env.ACCESS_NEXUS_SERVER ?? 'http://localhost:3001',
    attachment_temp_dir: process.env.ATTACHMENT_TEMP_DIR ?? path.resolve(__dirname, "..", "..", "..", "temp"),
    bodyLimit: process.env.BODY_LIMIT ?? '20 mb'
}