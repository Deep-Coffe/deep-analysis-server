import EnvConfig from '@application/env/EnvConfig'
import crypto from 'crypto'
import { serverConfig } from './env/ServerConfig'

export default {
    storage: {
        filename: () => crypto.randomBytes(10).toString("hex"),
        directory: serverConfig.access_nexus_server,
    }
}