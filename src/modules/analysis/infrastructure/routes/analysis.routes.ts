import { HttpMethods } from "@application/router/HTTPMethodsEnum";
import { RouterConfigType } from "@application/router/RouterConfigType";
import RouterDomain from "@application/router/RouterDomain";
import AddAnalysisController from "../controller/addAnalysisController/AddAnalysisController";
import AnalysisValidation from "../validation/AnalysisValidation";
import ListAnalysisController from "../controller/listAnalysisController/ListAnalysisController";
import DeleteAnalysisController from "../controller/deleteAnalysisController/DeleteAnalysisController";

class AnalysisRoute extends RouterDomain<AnalysisValidation> {
    routerConfig: RouterConfigType<AnalysisValidation>[] = [
        {
            method: HttpMethods.POST,
            path: '/',
            controller: AddAnalysisController,
            validationMethod: 'addAnalysisValidate',
            isAuthenticate: true,
            responseCode: 200,
        },
        {
            method: HttpMethods.GET,
            path: '/',
            controller: ListAnalysisController,
            isAuthenticate: true,
            responseCode: 200,
        },
        {
            method: HttpMethods.DELETE,
            path: '/:id',
            controller: DeleteAnalysisController,
            isAuthenticate: true,
            responseCode: 200,
        }
    ];

    constructor() {
        super('analysis', AnalysisValidation);
    }
}

export default AnalysisRoute;