import RouterDomain from "@application/router/RouterDomain";
import ConsumableValidation from "../validation/ConsumableValidation";
import { RouterConfigType } from "@application/router/RouterConfigType";
import { HttpMethods } from "@application/router/HTTPMethodsEnum";
import ListConsumableController from "../controller/listConsumableController/ListConsumableController";
import HttpResponseCode from "@application/router/HTTPResponseCode";

class ConsumableRoute extends RouterDomain<ConsumableValidation> {
    public routerConfig: RouterConfigType<ConsumableValidation>[] = [
        {
            method: HttpMethods.GET,
            path: '/',
            validationMethod: 'listConsumable',
            controller: ListConsumableController,
            responseCode: HttpResponseCode.SUCCESS,
        }
    ];

    constructor() {
        super('consumable', ConsumableValidation);
    }
}

export default ConsumableRoute;