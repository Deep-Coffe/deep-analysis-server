import 'reflect-metadata'
import Application from '@application/app/Application'
import Logger from '@application/config/LoggerConfig';

const app = new Application();

try {
    app.runServer()
} catch (err) {
    if (err instanceof Error)
        Logger.error(err);
    else
        Logger.error(new Error('Server stop unknown error'))
}