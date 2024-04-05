import RouterDomain from "@application/router/RouterDomain";
import ClassifyValidator from "../validator/ClassifyValidator";
import { RouterConfigType } from "@application/router/RouterConfigType";
import { HttpMethods } from "@application/router/HTTPMethodsEnum";
import ClassifyImageController from "../controller/ClassifyImageController/ClassifyImageController";
import HttpResponseCode from "@application/router/HTTPResponseCode";

class ClassifyRouter extends RouterDomain<ClassifyValidator> {
    routerConfig: RouterConfigType<ClassifyValidator>[] = [
        {
            method: HttpMethods.POST,
            path: '/',
            controller: ClassifyImageController,
            validationMethod: 'validateImageClassify',
            responseCode: HttpResponseCode.SUCCESS,
        }
    ];

    constructor() {
        super('classify', ClassifyValidator);
    }
}

export default ClassifyRouter