/* eslint-disable @typescript-eslint/no-unused-vars */
import "express-async-errors"
import Logger from "@application/config/LoggerConfig";
import EnvConfig from "@application/env/EnvConfig";
import express, { Express, NextFunction, Request, Response } from "express";
import AppError from "@application/error/AppError";
import ServerError from "@application/error/ServerError";
import RouterSetup from "@application/setup/RouterSetup";
import NotFoundError from "@application/error/NotFoundError";
import ISetup from "@application/setup/ISetup";
import DataBaseSetup from "@application/setup/DataBaseSetup";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { serverConfig } from "@config/env/ServerConfig";

class Application {
    private readonly app: Express;
    private readonly setups: ISetup[];

    constructor() {
        this.app = express();
        this.setups = [new RouterSetup(this.app), new DataBaseSetup()]
    }

    private async runSetups() {
        for (const setup of this.setups) {
            await setup.run();
        }
    }

    private async setupApplication() {
        Logger.info('Configuring server');
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json({ limit: serverConfig.bodyLimit }));
        this.app.use(cors({
            origin: serverConfig.client
        }))

        await this.runSetups();

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            return res.status(404).json(new NotFoundError('Url not found').getDetails());
        });

        this.app.use((error: Error, _: Request, res: Response, _next: NextFunction) => {
            Logger.error(error);
            if (error instanceof AppError) {
                return res.status(error.statusCode).send(error.getDetails());
            } else {
                return res.status(500).json(new ServerError('Internal server Error').getDetails());
            }
        });
    }


    public runServer() {
        this.setupApplication().then(() => this.app.listen(EnvConfig.getPort(), () => {
            Logger.info(`Server start in port ${EnvConfig.getPort()}`)
        })).catch(err => Logger.error(err))
    }
}

export default Application;