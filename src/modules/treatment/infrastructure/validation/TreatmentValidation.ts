import { PlagueEnum } from "@common/enum/Plague";
import Joi from "joi";

export default class TreatmentValidation {
    public createTreatment() {
        return Joi.object({
            plagueName: Joi.string().valid(...Object.values(PlagueEnum)).required(),
            name: Joi.string(),
            consumables: Joi.array().items(Joi.object({
                quantity: Joi.number().integer().required(),
                consumable: Joi.object({
                    id: Joi.string().uuid(),
                    name: Joi.string(),
                }).xor('id', 'name').required()
            })).required()
        })
    }
}