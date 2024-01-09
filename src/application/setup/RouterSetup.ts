import { Express } from "express";
import ISetup from "./ISetup";
import Injection from "@application/helpers/Injection";
import RouterMiddleware from "@application/middleware/RouterMiddleware";
import Logger from "@application/config/LoggerConfig";
import path from 'path'
import fs from 'fs'
import RouterDomain from "@application/router/RouterDomain";
import ControllerMiddleware from "@application/middleware/ControllerMiddleware";

class RouterSetup implements ISetup {
    constructor(private readonly _app: Express,
    ) { }

    public async run(): Promise<void> {
        Logger.info('Run all routes:')
        const injection = new Injection();
        const controllerMiddleware = new ControllerMiddleware();
        const routerMiddleware = new RouterMiddleware(controllerMiddleware);

        const modulesDir = path.join(__dirname, '..', '..', 'modules');

        const moduleFolders = fs.readdirSync(modulesDir).filter(item =>
            fs.statSync(path.join(modulesDir, item)).isDirectory()
        );

        moduleFolders.forEach(moduleFolder => {
            const routesDir = path.join(modulesDir, moduleFolder, 'infrastructure', 'routes');

            if (fs.existsSync(routesDir)) {
                const routeFiles = fs.readdirSync(routesDir);

                const routeModules = routeFiles
                    .filter(file => file.endsWith('.routes.ts'))
                    .map(file => require(path.join(routesDir, file)));

                routeModules.forEach(routeModule => {
                    if (routeModule.default.prototype instanceof RouterDomain) {
                        const route = new routeModule.default() as RouterDomain;
                        route.setup(routerMiddleware, injection);
                        this._app.use(`/api/${route.prefix}`, route.getRouter());
                    }
                });
            }
        });
    }
}

export default RouterSetup;