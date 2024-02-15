import Joi from "joi";

export default class AnalysisValidation {
    addAnalysisValidate() {
        return Joi.object({
            author: Joi.string().required(),
            image: Joi.string().required(),
            analyzedAt: Joi.date(),
        })
    }
}