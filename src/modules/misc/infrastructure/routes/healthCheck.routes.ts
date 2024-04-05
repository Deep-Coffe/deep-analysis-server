import { HttpMethods } from "@application/router/HTTPMethodsEnum";
import { RouterConfigType } from "@application/router/RouterConfigType";
import RouterDomain from "@application/router/RouterDomain";
import HealthCheckController from "../controller/healthCheckController/HealthCheckController";

class HealthCheckRouter extends RouterDomain {
    public routerConfig: RouterConfigType<undefined>[] = [
        {
            path: '/',
            method: HttpMethods.GET,
            controller: HealthCheckController,
        }
    ]
    constructor() {
        super('__healthCheck');
    }
}

export default HealthCheckRouter;