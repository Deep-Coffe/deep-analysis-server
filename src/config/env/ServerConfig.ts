import dotenv from 'dotenv';
import path from 'path'

dotenv.config();

export const serverConfig = {
    client: process.env.CLIENT ?? '*',
    attachment_temp_dir: process.env.ATTACHMENT_TEMP_DIR ?? path.resolve(__dirname, "..", "..", "..", "temp"),
    bodyLimit: process.env.BODY_LIMIT ?? '20 mb'
}