import Joi from "joi";

export default class AnalysisValidation {
    addAnalysisValidate() {
        return Joi.object({
            author: Joi.string().required(),
            name: Joi.string().required(),
            image: Joi.string().required(),
            analyzedAt: Joi.date(),
        });
    }

    deleteAnalysisValidate() {
        return Joi.object({
            id: Joi.string().uuid(),
        });
    }
}