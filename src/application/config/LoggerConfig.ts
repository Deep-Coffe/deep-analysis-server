import pino from "pino"

class Logger {
    static logger = pino({
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    });

    static info(data: string) {
        Logger.logger.info(data);
    }

    static error(err: Error) {
        Logger.logger.error(err)
    }

    static warn(data: string) {
        Logger.logger.warn(data);
    }
}

export default Logger;