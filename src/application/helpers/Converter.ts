/* eslint-disable @typescript-eslint/no-explicit-any */

import { DateMetadata } from "@application/entity/DateMetadata";

export default class Converter {
    static covertDate(raw: any) {
        return new Date(raw);
    }

    static convertDateMetadata(raw: any): DateMetadata {
        return {
            createdAt: this.covertDate(raw),
            updatedAt: raw.updatedAt ? this.covertDate(raw.updatedAt) : undefined
        }
    }
}