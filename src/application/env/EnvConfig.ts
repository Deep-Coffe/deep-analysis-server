import 'dotenv'

class EnvConfig {
    static getPort() {
        return process.env.PORT ?? 3000
    }
}

export default EnvConfig;