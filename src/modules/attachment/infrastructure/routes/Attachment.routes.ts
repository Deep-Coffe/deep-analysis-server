import RouterDomain from "@application/router/RouterDomain";
import AttachmentValidator from "../validator/AttachmentValidator";
import { RouterConfigType } from "@application/router/RouterConfigType";
import { HttpMethods } from "@application/router/HTTPMethodsEnum";
import GetAttachmentController from "../controller/GetAttachmentController/GetAttachmentController";
import HttpResponseCode from "@application/router/HTTPResponseCode";

class AttachmentRoute extends RouterDomain<AttachmentValidator> {
    routerConfig: RouterConfigType<AttachmentValidator>[] = [
        {
            method: HttpMethods.GET,
            path: '/:fileName',
            controller: GetAttachmentController,
            validationMethod: 'getAttachmentValidate',
            isAuthenticate: false,
            isStream: true,
            responseCode: HttpResponseCode.SUCCESS,
        }
    ];

    constructor() {
        super('attachment', AttachmentValidator)
    }
}

export default AttachmentRoute;