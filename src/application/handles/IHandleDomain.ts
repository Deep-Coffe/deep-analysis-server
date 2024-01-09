import { Types } from "@application/types/Types";

export interface IHandleDomain<V = undefined> {
    validator: Types<V> | undefined,
    prefix: string,
}