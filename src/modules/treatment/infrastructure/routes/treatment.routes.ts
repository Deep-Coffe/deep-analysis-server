import RouterDomain from "@application/router/RouterDomain";
import TreatmentValidation from "../validation/TreatmentValidation";
import { RouterConfigType } from "@application/router/RouterConfigType";
import { HttpMethods } from "@application/router/HTTPMethodsEnum";
import CreateTreatmentController from "@modules/treatment/infrastructure/controller/createTreatmentController/CreateTreatmentController";
import HttpResponseCode from "@application/router/HTTPResponseCode";

class TreatmentRoute extends RouterDomain<TreatmentValidation> {
    public routerConfig: RouterConfigType<TreatmentValidation>[] = [
        {
            method: HttpMethods.POST,
            path: '/',
            controller: CreateTreatmentController,
            validationMethod: 'createTreatment',
            isAuthenticate: true,
            successResponseCode: HttpResponseCode.SUCCESS,
        }
    ];

    constructor() {
        super('treatment', TreatmentValidation);
    }
}

export default TreatmentRoute;