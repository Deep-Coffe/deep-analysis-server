import { Types } from "@application/types/Types"
import { HttpMethods } from "./HTTPMethodsEnum"
import IController from "@application/controller/IController"

export type RouterConfigType<V = undefined> = {
    method: HttpMethods,
    path: string,
    controller: Types<IController>,
    isAuthenticate?: boolean,
    responseCode?: number,
    validationMethod?: keyof V,
}