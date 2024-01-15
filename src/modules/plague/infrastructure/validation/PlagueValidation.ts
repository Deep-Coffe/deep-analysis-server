import Joi from "joi";

class PlagueValidation {
    public validateCreatePlague() {
        return Joi.object({
            name: Joi.string().required(),
            description: Joi.string()
        })
    }
}

export default PlagueValidation;