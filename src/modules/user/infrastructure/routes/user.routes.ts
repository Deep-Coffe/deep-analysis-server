import { HttpMethods } from "@application/router/HTTPMethodsEnum";
import { RouterConfigType } from "@application/router/RouterConfigType";
import RouterDomain from "@application/router/RouterDomain";
import UserValidation from "../validation/UserValidation";
import CreateUserController from "../controller/createUserController.ts/CreateUserController";
import CreateSessionController from "../controller/createSessionController/CreateSessionController";


class UserRouter extends RouterDomain<UserValidation> {
    public routerConfig: RouterConfigType<UserValidation>[] = [
        {
            method: HttpMethods.POST,
            path: '/',
            controller: CreateUserController,
            validationMethod: 'createUser',
            responseCode: 200,
        },
        {
            method: HttpMethods.POST,
            path: '/session',
            controller: CreateSessionController,
            validationMethod: 'createSession',
            responseCode: 200,
        },
    ];

    constructor() {
        super('user', UserValidation);
    }
}


export default UserRouter;