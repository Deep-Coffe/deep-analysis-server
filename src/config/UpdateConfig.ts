import crypto from 'crypto'
import { serverConfig } from './env/ServerConfig'

export default {
    storage: {
        filename: () => crypto.randomBytes(10).toString("hex"),
        directory: serverConfig.attachment_temp_dir,
    }
}