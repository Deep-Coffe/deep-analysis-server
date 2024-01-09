import Joi from "joi";

export default class AnalysisValidation {
    addAnalysisValidate() {
        return Joi.object({
            author: Joi.string().required(),
            analyzedAt: Joi.date(),
            cerscospora: Joi.number().required(),
            healthy: Joi.number().required(),
            leafRust: Joi.number().required(),
            miner: Joi.number().required(),
            phoma: Joi.number().required()
        })
    }
}