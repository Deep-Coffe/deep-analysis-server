import Joi from "joi";

export default class ConsumableValidation {
    public listConsumable() {
        return Joi.object({
            searchTerm: Joi.string(),
            limit: Joi.number(),
            offset: Joi.number(),
        })
    }
}