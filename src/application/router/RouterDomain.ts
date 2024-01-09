import { IHandleDomain } from "@application/handles/IHandleDomain";
import { RouterConfigType } from "./RouterConfigType";
import { Router } from "express";
import RouterMiddleware from "@application/middleware/RouterMiddleware";
import Injection from "@application/helpers/Injection";
import Logger from "@application/config/LoggerConfig";
import { Types } from "@application/types/Types";
import ValidatorMiddleware from "@application/middleware/ValidatorMiddleware";
import AuthMiddleware from "@application/middleware/AuthMiddleware";

abstract class RouterDomain<V = undefined> implements IHandleDomain<V> {
    private readonly _router: Router;
    public validator: Types<V> | undefined;
    public prefix: string;

    abstract routerConfig: RouterConfigType<V>[];

    constructor(prefix: string, validator?: Types<V>) {
        this.prefix = prefix;
        this.validator = validator;
        this._router = Router();
    }

    public setup(routerMiddleware: RouterMiddleware, injection: Injection) {
        const auth = injection.resolver(AuthMiddleware);

        Logger.info(`Configuring domain: ${this.prefix}`);
        this.routerConfig.forEach(router => {
            Logger.info(`Configuring path: ${router.path}`);

            this._router[router.method](
                router.path,
                auth.handle(injection, router.isAuthenticate),
                ValidatorMiddleware.handle<V>(this.validator, router.validationMethod),
                routerMiddleware.handle(router.controller, injection));

        });
    }

    public getRouter() {
        return this._router;
    }
}

export default RouterDomain;