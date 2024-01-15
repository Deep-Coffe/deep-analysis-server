import { HttpMethods } from "@application/router/HTTPMethodsEnum";
import { RouterConfigType } from "@application/router/RouterConfigType";
import RouterDomain from "@application/router/RouterDomain";
import ListPlagueController from "../controller/ListPlagueController/ListPlagueController";
import HttpResponseCode from "@application/router/HTTPResponseCode";
import PlagueValidation from "../validation/PlagueValidation";
import CreatePlagueController from "../controller/CreatePlagueController/CreatePlagueController";


class PlagueRoute extends RouterDomain<PlagueValidation> {
    public routerConfig: RouterConfigType<PlagueValidation>[] = [
        {
            method: HttpMethods.GET,
            controller: ListPlagueController,
            path: '/',
            successResponseCode: HttpResponseCode.SUCCESS
        },
        {
            method: HttpMethods.POST,
            controller: CreatePlagueController,
            path: '/',
            validationMethod: 'validateCreatePlague',
            isAuthenticate: true,
            successResponseCode: HttpResponseCode.SUCCESS
        }
    ];

    constructor() {
        super('plague', PlagueValidation)
    }
}

export default PlagueRoute;