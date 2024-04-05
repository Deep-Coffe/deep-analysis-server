import { ControllerInput } from "@application/controller/ControllerIO";
import Joi from "joi";

class ClassifyValidator {
    public validateImageClassify(data: ControllerInput) {
        const schema = Joi.object({
            image: Joi.string().required(),
        });

        return schema.validate(data.payload);
    }
}

export default ClassifyValidator